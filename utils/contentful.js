const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
  space: space,
  accessToken: accessToken,
})

export async function fetchContent() {
  const entry = await client.getEntry('7MhAM9THkkKci0e0oIeYQa');
  return entry;
}

export default { fetchContent }