import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [page, setPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const limit = 10;

  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    convertedLeads: 0,
    newLeads: 0,
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/leads?search=${search}&status=${status}&source=${source}&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}`
      )
      .then((res) => {
        setLeads(res.data.data);
        setMetrics(res.data.metrics);
      })
      .catch(console.error);
  }, [search, status, source, page, sortBy, sortOrder]);

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
    setTimeout(() => {
      document.getElementById('lead-details')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'converted': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                L
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Lead CRM</h1>
            </div>
            <button 
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
          <p className="text-sm sm:text-base text-gray-600">Overview of your lead pipeline</p>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Leads Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                👥
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Leads</h3>
            <p className="text-3xl font-bold text-gray-900">{metrics.totalLeads}</p>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </div>

          {/* Converted Leads Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                ✅
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Converted Leads</h3>
            <p className="text-3xl font-bold text-green-600">{metrics.convertedLeads}</p>
            <p className="text-sm text-gray-500 mt-1">
              {metrics.totalLeads > 0 
                ? `${((metrics.convertedLeads / metrics.totalLeads) * 100).toFixed(1)}% conversion rate`
                : '0% conversion rate'
              }
            </p>
          </div>

          {/* New Leads Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                📈
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">New Leads</h3>
            <p className="text-3xl font-bold text-orange-600">{metrics.newLeads}</p>
            <p className="text-sm text-gray-500 mt-1">Pending contact</p>
          </div>
        </div>

        {/* Leads Table Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6 sm:mb-8">
          {/* Search and Filters */}
          <div className="p-4 sm:p-6 border-b border-gray-200">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Leads Management
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Search Input */}
              <div className="lg:col-span-1">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
              
              {/* Status Filter */}
              <div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                >
                  <option value="">All Status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
              
              {/* Source Filter */}
              <div>
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                >
                  <option value="">All Sources</option>
                  <option value="facebook">Facebook</option>
                  <option value="google">Google</option>
                  <option value="referral">Referral</option>
                </select>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-600">
              Showing <span className="font-semibold">{leads.length}</span> leads
            </div>
          </div>

          {/* Table - Desktop View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th 
                    onClick={() => handleSort('name')} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {sortBy === 'name' && (
                        <span className="text-blue-600 font-bold">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('email')} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Email</span>
                      {sortBy === 'email' && (
                        <span className="text-blue-600 font-bold">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('status')} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Status</span>
                      {sortBy === 'status' && (
                        <span className="text-blue-600 font-bold">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    onClick={() => handleSort('source')} 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition-colors select-none"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Source</span>
                      {sortBy === 'source' && (
                        <span className="text-blue-600 font-bold">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 capitalize">{lead.source}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleViewDetails(lead)}
                        className="text-blue-600 hover:text-blue-900 font-medium text-sm hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards - Mobile View */}
          <div className="md:hidden divide-y divide-gray-200">
            {leads.map((lead) => (
              <div key={lead._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{lead.name}</h4>
                    <p className="text-sm text-gray-600 mt-1">{lead.email}</p>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.status)}`}>
                    {lead.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 capitalize">
                    <span className="font-medium">Source:</span> {lead.source}
                  </span>
                  <button
                    onClick={() => handleViewDetails(lead)}
                    className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="p-4 sm:p-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Page <span className="font-semibold">{page}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={leads.length < limit}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Details Section */}
        {selectedLead && (
          <div id="lead-details" className="bg-white rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 py-6 sm:py-8 rounded-t-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    Lead Details
                  </h3>
                  <p className="text-blue-100 text-sm sm:text-base">
                    Complete information about {selectedLead.name}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-white hover:text-gray-200 transition-colors"
                  aria-label="Close details"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Personal Information */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Personal Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Full Name</label>
                      <p className="text-gray-900 font-semibold mt-1">{selectedLead.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Email Address</label>
                      <p className="text-gray-900 font-semibold mt-1">{selectedLead.email}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Lead ID</label>
                      <p className="text-gray-900 font-mono text-sm mt-1">{selectedLead._id}</p>
                    </div>
                  </div>
                </div>

                {/* Lead Information */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                    Lead Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Status</label>
                      <div className="mt-1">
                        <span className={`px-3 py-1.5 inline-flex text-sm font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                          {selectedLead.status}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Source</label>
                      <p className="text-gray-900 font-semibold capitalize mt-1">{selectedLead.source}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 font-medium">Created Date</label>
                      <p className="text-gray-900 font-semibold mt-1">
                        {selectedLead.createdAt 
                          ? new Date(selectedLead.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'N/A'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information Table */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Additional Details
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Field</td>
                        <td className="py-3 px-4 text-gray-900">Value</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Name</td>
                        <td className="py-3 px-4 text-gray-900">{selectedLead.name}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Email</td>
                        <td className="py-3 px-4 text-gray-900">{selectedLead.email}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Status</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedLead.status)}`}>
                            {selectedLead.status}
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Source</td>
                        <td className="py-3 px-4 text-gray-900 capitalize">{selectedLead.source}</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-700 bg-gray-50">Lead ID</td>
                        <td className="py-3 px-4 text-gray-900 font-mono text-xs">{selectedLead._id}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Lead
                </button>
                <button className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors">
                  Mark as Converted
                </button>
                <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}