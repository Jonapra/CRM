import Lead from "../models/Lead.js";

export const getLeads = async (req, res) => {
  const { search, status, source, page = 1, limit = 10 } = req.query;

  let query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  if (status) query.status = status;
  if (source) query.source = source;

  const leads = await Lead.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Lead.countDocuments(query);

  res.json({ data: leads, total, page: Number(page) });
};

export const getLeadById = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  res.json(lead);
};
