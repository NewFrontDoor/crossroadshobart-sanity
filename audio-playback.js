import React from 'react';
import PropTypes from 'prop-types';
import {StyledPlayer} from '@newfrontdoor/audio-player';
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';
import Dropzone from 'react-dropzone';
import {ScaleLoader} from 'react-spinners';
import {retry} from '@lifeomic/attempt';
import styles from './plugins/s3-upload-widget/s3upload.css';
import jsmediatags from 'jsmediatags';

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(value));

function getPresignedPostData(selectedFile) {
  return fetch('https://www.crossroadshobart.org/api/sermon-upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: selectedFile.name,
      type: selectedFile.type
    })
  });
}

function uploadFileToS3(presignedPostData, file) {
  const formData = new FormData();
  Object.keys(presignedPostData.fields).forEach(key => {
    formData.append(key, presignedPostData.fields[key]);
  });
  // Actual file has to be appended last.
  formData.append('file', file);

  return fetch(presignedPostData.url, {
    method: 'POST',
    body: formData
  });
}

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

export default class AudioPlayer extends React.Component {
  state = {
    title: '',
    passage: '',
    preachedDate: '',
    speaker: '',
    series: '',
    key: null,
    fileOnS3: false,
    error: false
  };

  static propTypes = {
    type: PropTypes.shape({
      title: PropTypes.string
    }).isRequired,
    value: PropTypes.string
  };

  onDrop = async acceptedFiles => {
    this.activateUpload(acceptedFiles[0]);
    this.setState({fileName: acceptedFiles[0].name});
  };

  async activateUpload(selectedFile) {
    try {
      const response = await getPresignedPostData(selectedFile);

      if (response.ok) {
        await response
          .json()
          .then(data => this.completeUpload(selectedFile, data));
      }
    } catch (error) {
      console.log('Fialed to completeUpload', error);
    }
  }

  async completeUpload(selectedFile, presignedPostData) {
    try {
      await uploadFileToS3(presignedPostData, selectedFile);
      this.setState({
        fileOnS3: true
      });

      console.log(presignedPostData.fields.key);
      this.props.onChange(createPatchFrom(presignedPostData.fields.key));
      console.log('File was successfully uploaded!');
    } catch (error) {
      console.log('there was a problem with setting fileonS3 to true');
      console.log('An error occurred!', error.message);
    }
  }

  checkAWS = async () => {
    const response = await fetch(
      `https://sermons.crossroadshobart.org/${this.props.value}`,
      {
        method: 'HEAD',
        redirect: 'follow'
      }
    );

    // Abort retrying if the resource doesn't exist
    if (response.ok) {
      return true;
    }

    throw new Error(response.statusText);
  };

  componentDidMount() {
    if (this.props.value) {
      (async () => {
        const result = await retry(this.checkAWS, {
          delay: 4000,
          factor: 2,
          maxAttempts: 4
        });
        this.setState({
          fileOnS3: result
        });
      })().catch(error => {
        console.log(error);
        this.setState({
          error: true
        });
      });
    }
  }

  render() {
    const {type, value} = this.props;
    if (this.state.fileOnS3) {
      jsmediatags.read(`https://sermons.crossroadshobart.org/${value}`, {
        onSuccess(tag) {
          console.log(tag);
        },
        onError(error) {
          console.log(error);
        }
      });
    }

    return (
      <div>
        <h2>{value ? type.title : 'Upload Audio'}</h2>
        {value && this.state.fileOnS3 ? (
          <StyledPlayer
            hasPlaybackSpeed
            hasBorder
            isInvert={false}
            highlight="#548BF4"
            base="#ddd"
            audio={`https://sermons.crossroadshobart.org/${value}`}
          />
        ) : value && this.state.error ? (
          <div>
            Audio could not load due to an error. Please contact
            support@newfrontdoor.org.
          </div>
        ) : value ? (
          <div>
            <ScaleLoader
              height={30}
              width={10}
              radius={2}
              margin="2px"
              color="#36D7B7"
            />
            <p>Loading audio file...</p>
            <p>
              N.b. It's ok to hit the 'Publish' button below while file is
              loading.
            </p>
          </div>
        ) : (
          <div className={styles.dropArea}>
            <Dropzone accept="audio/*" onDrop={this.onDrop}>
              {({getRootProps, getInputProps, isDragActive, isDragReject}) => {
                let styles = {...baseStyle};
                styles = isDragActive ? {...styles, ...activeStyle} : styles;
                styles = isDragReject ? {...styles, ...rejectStyle} : styles;
                return (
                  <div {...getRootProps()} style={styles}>
                    <input {...getInputProps()} />
                    {this.state.fileName ? (
                      <p>'{this.state.fileName}' is uploading...</p>
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
        )}
      </div>
    );
  }
}
