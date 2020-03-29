import client from 'part:@sanity/base/client'

client
  .delete({query: '*[_type == "speaker"]'})
  .then(console.log)
  .catch(console.error)