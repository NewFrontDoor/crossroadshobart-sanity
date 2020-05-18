import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import Button from 'part:@sanity/components/buttons/default';
import sanityClient from 'part:@sanity/base/client';
import styles from './s3upload.css';
import speakingurl from 'speakingurl';

const bucket = 'sermons.crossroadshobart.org';

const getPresignedPostData = (selectedFile, bucket) => {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();

    // Set the proper URL here.
    const url = 'https://serverless.newfrontdoor.org/sermon-upload';

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(
      JSON.stringify({
        name: selectedFile.name,
        type: selectedFile.type,
        bucket
      })
    );
    xhr.addEventListener('load', e => {
      resolve(JSON.parse(e.target.response));
    });
  });
};

const uploadFileToS3 = (presignedPostData, file) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    Object.keys(presignedPostData.fields).forEach(key => {
      formData.append(key, presignedPostData.fields[key]);
    });
    // Actual file has to be appended last.
    formData.append('file', file);

    fetch(presignedPostData.url, {
      method: 'post',
      body: formData
    }).then(response => {
      response.status === 204 ? resolve() : reject(response);
    });
  });
};

function patchSanity({title, passage, series, date, speaker, key}) {
  const doc = {
    _type: 'sermon',
    title,
    passage,
    slug: {
      _type: 'slug',
      current: speakingurl(title, {truncate: 200, symbols: true})
    },
    preachedDate: date,
    speaker: {_ref: speaker},
    series: {_ref: series},
    file: key
  };

  sanityClient.create(doc).then(res => {
    console.log(`Document was created, document ID is ${res._id}`);
  });
}

const speakerQuery = `
*[ _type == "speaker" && primary == true]`;

const seriesQuery = `
*[ _type == "series" && concluded == false]`;

const allQuery = `
      {
        'speakers': ${speakerQuery},
        'series': ${seriesQuery},
      }
    `;

const baseStyle = {
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};

const uploadStates = ['init', 'pending', 'sending', 'complete'];

class s3upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      title: '',
      passage: '',
      preachedDate: '',
      speaker: '',
      series: '',
      key: null,
      dataTrue: false,
      uploadState: uploadStates[0]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.updateKey = this.updateKey.bind(this);
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.activateUpload(acceptedFiles[0], bucket);
    this.setState({file: acceptedFiles, fileName: acceptedFiles[0].name});
  };

  componentDidMount() {
    sanityClient.fetch(allQuery).then(response => {
      this.setState(prevState => ({
        ...prevState,
        speakerList: response.speakers,
        seriesList: response.series,
        dataTrue: true,
        extraData: ''
      }));
    });
  }

  handleInputChange(event) {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const {name} = target;
    this.setState({
      [name]: value
    });
  }

  updateKey(keyVal) {
    this.setState({
      key: keyVal,
      uploadState: uploadStates[1]
    });
  }

  async activateUpload(selectedFile, bucket) {
    // Step 1 - get pre-signed POST data.
    const {data} = await getPresignedPostData(selectedFile, bucket);
    await this.updateKey(data);
  }

  completeUpload(selectedFile, key) {
    this.setState({
      uploadState: uploadStates[2]
    });
    try {
      uploadFileToS3(key, selectedFile);
      patchSanity(this.state);
      console.log('File was successfully uploaded!');
      this.setState({
        uploadState: uploadStates[3]
      });
    } catch (error) {
      console.log('An error occurred!', error.message);
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Upload sermon</h2>
        </header>
        <div className={styles.content}>
          <div className={styles.dropArea}>
            <Dropzone accept="audio/*" onDrop={this.onDrop}>
              {({
                getRootProps,
                getInputProps,
                isDragActive,
                isDragAccept,
                isDragReject,
                acceptedFiles,
                rejectedFiles
              }) => {
                let styles = {...baseStyle};
                styles = isDragActive ? {...styles, ...activeStyle} : styles;
                styles = isDragReject ? {...styles, ...rejectStyle} : styles;
                return (
                  <div {...getRootProps()} style={styles}>
                    <input {...getInputProps()} />
                    {this.state.fileName ? (
                      <p>'{this.state.fileName}' ready for upload</p>
                    ) : isDragReject ? (
                      <p>Unsupported file type...</p>
                    ) : (
                      <p>
                        Try dropping an audio file here, or click to select file
                        for upload.
                      </p>
                    )}
                  </div>
                );
              }}
            </Dropzone>
          </div>
          <label
            htmlFor="title"
            style={{
              fontSize: '20px',
              fontWeight: '400',
              display: 'block',
              margin: '16px 0 8px 0'
            }}
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            style={{
              border: '1px solid rgba(23, 23, 23, 0.2)',
              display: 'block',
              width: '100%',
              lineHeight: '2em',
              fontSize: 'inherit',
              boxSizing: 'border-box',
              padding: '0.2em 0.5em',
              borderRadius: '2px',
              color: 'rgb(48, 48, 48)',
              backgroundColor: '#fff',
              boxShadow: 'none'
            }}
            onChange={this.handleInputChange}
          />
          <label
            htmlFor="passage"
            style={{
              fontSize: '20px',
              fontWeight: '400',
              display: 'block',
              margin: '16px 0 8px 0'
            }}
          >
            Passage
          </label>
          <input
            type="passage"
            id="passage"
            name="passage"
            value={this.state.passage}
            style={{
              border: '1px solid rgba(23, 23, 23, 0.2)',
              display: 'block',
              width: '100%',
              lineHeight: '2em',
              fontSize: 'inherit',
              boxSizing: 'border-box',
              padding: '0.2em 0.5em',
              borderRadius: '2px',
              color: 'rgb(48, 48, 48)',
              backgroundColor: '#fff',
              boxShadow: 'none'
            }}
            onChange={this.handleInputChange}
          />
          <label
            htmlFor="preachedDate"
            style={{
              fontSize: '20px',
              fontWeight: '400',
              display: 'block',
              margin: '16px 0 8px 0'
            }}
          >
            Date preached
          </label>
          <input
            type="date"
            id="preachedDate"
            name="preachedDate"
            value={this.state.preachedDate}
            style={{
              border: '1px solid rgba(23, 23, 23, 0.2)',
              display: 'block',
              width: '100%',
              lineHeight: '2em',
              fontSize: 'inherit',
              boxSizing: 'border-box',
              padding: '0.2em 0.5em',
              borderRadius: '2px',
              color: 'rgb(48, 48, 48)',
              backgroundColor: '#fff',
              boxShadow: 'none'
            }}
            onChange={this.handleInputChange}
          />
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <div style={{gridColumn: '1'}}>
              <label
                htmlFor="speaker"
                style={{
                  fontSize: '20px',
                  fontWeight: '400',
                  display: 'block',
                  margin: '16px 0 8px 0'
                }}
              >
                Speaker
              </label>
              <select
                name="speaker"
                value={this.state.speaker}
                style={{width: '90%'}}
                className={styles.selectCss}
                onChange={this.handleInputChange}
              >
                <option>Please select</option>
                {this.state.dataTrue
                  ? this.state.speakerList.map(speaker => {
                      return (
                        <option key={speaker._id} value={speaker._id}>
                          {speaker.name}
                        </option>
                      );
                    })
                  : ''}
              </select>
            </div>
            <div style={{gridColumn: '2'}}>
              <label
                htmlFor="series"
                style={{
                  fontSize: '20px',
                  fontWeight: '400',
                  display: 'block',
                  margin: '16px 0 8px 0'
                }}
              >
                Series
              </label>
              <select
                name="series"
                value={this.state.series}
                style={{width: '90%'}}
                className={styles.selectCss}
                onChange={this.handleInputChange}
              >
                <option>Please select</option>
                {this.state.dataTrue
                  ? this.state.seriesList.map(series => {
                      return (
                        <option key={series._id} value={series._id}>
                          {series.title}
                        </option>
                      );
                    })
                  : ''}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            bleed
            color="primary"
            kind="simple"
            disabled={
              this.state.uploadState === uploadStates[2] ||
              this.state.uploadState === uploadStates[3]
            }
            onClick={() =>
              this.completeUpload(this.state.file[0], this.state.key)
            }
          >
            {this.state.uploadState === uploadStates[2]
              ? 'Spinner'
              : this.state.uploadState === uploadStates[3]
              ? 'Sermon Published'
              : 'Publish Sermon'}
          </Button>
        </div>
      </div>
    );
  }
}

export default {
  name: 's3upload',
  component: s3upload
};
