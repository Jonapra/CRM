import Lead from "../models/Lead.js";
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getLeads = async (req, res) => {
  try {
    const {
      search = "",
      status,
      source,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (status) query.status = status;
    if (source) query.source = source;

    const skip = (page - 1) * limit;

    // paginated leads
    const leads = await Lead.find(query)
      .skip(skip)
      .limit(Number(limit));

    // TOTAL counts (no pagination)
    const totalLeads = await Lead.countDocuments(query);
    const convertedLeads = await Lead.countDocuments({
      ...query,
      status: "converted",
    });
    const newLeads = await Lead.countDocuments({
      ...query,
      status: "new",
    });

    res.json({
      data: leads,
      metrics: {
        totalLeads,
        convertedLeads,
        newLeads,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
