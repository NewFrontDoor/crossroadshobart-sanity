import React, {useCallback} from 'react';
import PropTypes from 'prop-types';
import {S3Dropzone} from '@newfrontdoor/s3-file-upload';
import {AudioPlayer} from '@newfrontdoor/audio-player';
import PatchEvent, {set, unset} from 'part:@sanity/form-builder/patch-event';

const host = 'https://sermons.crossroadshobart.org';
const uploadUrl = 'http://www.crossroadshobart.org/api/sermon-upload';

const createPatchFrom = value =>
  PatchEvent.from(value === '' ? unset() : set(value));

export default function AudioPlayback({type, value, onChange}) {
  const handleFileChange = useCallback(
    function({key}) {
      onChange(createPatchFrom(key));
    },
    [onChange]
  );

  return (
    <S3Dropzone
      host={host}
      title={type.title}
      uploadUrl={uploadUrl}
      initialFileName={value}
      onChange={handleFileChange}
    >
      <AudioPlayer
        hasPlaybackSpeed
        hasBorder
        isInvert={false}
        highlight="#548BF4"
        base="#ddd"
      />
    </S3Dropzone>
  );
}

AudioPlayback.defaultProps = {
  value: undefined
};

AudioPlayback.propTypes = {
  type: PropTypes.shape({
    title: PropTypes.string
  }).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};
