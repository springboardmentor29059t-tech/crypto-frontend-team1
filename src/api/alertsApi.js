import axios from "axios";

const API_BASE = "http://localhost:8080/api/alerts";

// 🔹 Attach JWT automatically
const authHeaders = () => ({
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

// 🔹 Get alerts
export const fetchAlerts = async () => {
  const res = await axios.get(API_BASE, authHeaders());
  return res.data;
};

// 🔹 Add alert
export const addAlertApi = async (payload) => {
  const res = await axios.post(API_BASE, payload, authHeaders());
  return res.data;
};

// 🔹 Delete alert
export const deleteAlertApi = async (id) => {
  await axios.delete(`${API_BASE}/${id}`, authHeaders());
};
