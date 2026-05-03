import { useEffect, useState } from "react";

function Dashboard() {
  const [keys, setKeys] = useState([]);
  const [usage, setUsage] = useState(0);
  const [billing, setBilling] = useState(null);

  const token = localStorage.getItem("token");

  const fetchAll = async () => {
    try {
      const [keysRes, usageRes, billingRes] = await Promise.all([
        fetch("http://localhost:5000/api/keys", {
          headers: { Authorization: "Bearer " + token },
        }),
        fetch("http://localhost:5000/api/usage", {
          headers: { Authorization: "Bearer " + token },
        }),
        fetch("http://localhost:5000/api/billing", {
          headers: { Authorization: "Bearer " + token },
        }),
      ]);

      const keysData = await keysRes.json();
      const usageData = await usageRes.json();
      const billingData = await billingRes.json();

      setKeys(keysData);
      setUsage(usageData.totalRequests || 0);
      setBilling(billingData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }
    fetchAll();
  }, []);

  const createKey = async () => {
    await fetch("http://localhost:5000/api/keys/create", {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
    fetchAll();
  };

  const revokeKey = async (id) => {
    await fetch(`http://localhost:5000/api/keys/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    fetchAll();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-6">APIvexa Dashboard 🚀</h1>

      {/* TOP CARDS */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        
        <div className="bg-gray-800 p-5 rounded-xl">
          <p className="text-gray-400">Total Requests</p>
          <h2 className="text-2xl">{usage}</h2>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <p className="text-gray-400">Billing</p>
          <h2 className="text-xl">{billing?.totalCost || "₹0"}</h2>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl flex items-center justify-center">
          <button
            onClick={createKey}
            className="bg-purple-600 px-4 py-2 rounded"
          >
            + Create Key
          </button>
        </div>

      </div>

      {/* KEYS */}
      <div className="bg-gray-900 p-5 rounded-xl">
        <h2 className="mb-4 text-xl">API Keys</h2>

        {keys.length === 0 ? (
          <p>No keys</p>
        ) : (
          keys.map((k) => (
            <div
              key={k._id}
              className="flex justify-between bg-gray-800 p-3 mb-2 rounded"
            >
              <span className="text-sm break-all">{k.key}</span>

              <button
                onClick={() => revokeKey(k._id)}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Revoke
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;