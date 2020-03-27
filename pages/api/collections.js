import faunadb, { query as q } from 'faunadb';



if (secret) {
  client = new faunadb.Client({ "fnADn_Db5fACAuIxN4ElHl_KcZfmVA6ayTIZrpc9" });
}

export default async (req, res) => {
  try {
    let collections = [];

    if (!client) {
      return [];
    }

    await client
      .paginate(q.Collections())
      .map(ref => q.Get(ref))
      .each(page => {
        collections = collections.concat(page);
      });

    res.json({ collections });
  } catch (error) {
    res.status(500).json({ error });
  }
};
