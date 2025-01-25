import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    hobby: [],
    address: "",
    city: "",
  });

  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "hobby") {
      setFormData((prevData) => ({
        ...prevData,
        hobby: checked
          ? [...prevData.hobby, value]
          : prevData.hobby.filter((h) => h !== value),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!formData.username) tempErrors.username = "Username is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    if (!formData.password) {
      tempErrors.password = "Password is required.";
    } else if (!passwordPattern.test(formData.password)) {
      tempErrors.password =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    if (!formData.phone) tempErrors.phone = "Phone number is required.";
    if (!formData.gender) tempErrors.gender = "Gender is required.";
    if (formData.hobby.length === 0) tempErrors.hobby = "Select at least one hobby.";
    if (!formData.address) tempErrors.address = "Address is required.";
    if (!formData.city) tempErrors.city = "City is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (editIndex !== null) {
        // Update existing entry
        const updatedData = [...submittedData];
        updatedData[editIndex] = formData;
        setSubmittedData(updatedData);
        setEditIndex(null);
      } else {
        // Add new entry
        setSubmittedData((prevData) => [...prevData, formData]);
      }

      alert("Form submitted successfully!");
      setFormData({
        username: "",
        email: "",
        password: "",
        phone: "",
        gender: "",
        hobby: [],
        address: "",
        city: "",
      });
      setErrors({});
    }
  };

  const handleEdit = (index) => {
    const dataToEdit = submittedData[index];
    setFormData(dataToEdit);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    alert("Entry deleted successfully!");
  };

  return (
    <div className="container mt-5">
      <form
        className="p-4 border rounded shadow-sm bg-light"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center mb-4">User Registration Form</h2>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label fw-bold">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <div className="text-danger mt-1">{errors.username}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-bold">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger mt-1">{errors.email}</div>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-bold">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="text-danger mt-1">{errors.password}</div>}
        </div>

        {/* Phone */}
        <div className="mb-3">
          <label className="form-label fw-bold">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && <div className="text-danger mt-1">{errors.phone}</div>}
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label fw-bold">Gender</label>
          <div>
            <label className="me-3">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleChange}
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleChange}
              />{" "}
              Female
            </label>
          </div>
          {errors.gender && <div className="text-danger mt-1">{errors.gender}</div>}
        </div>

        {/* Hobby */}
        <div className="mb-3">
          <label className="form-label fw-bold">Hobby</label>
          <div>
            <label className="me-3">
              <input
                type="checkbox"
                name="hobby"
                value="Reading"
                checked={formData.hobby.includes("Reading")}
                onChange={handleChange}
              />{" "}
              Reading
            </label>
            <label>
              <input
                type="checkbox"
                name="hobby"
                value="Dancing"
                checked={formData.hobby.includes("Dancing")}
                onChange={handleChange}
              />{" "}
              Dancing
            </label>
          </div>
          {errors.hobby && <div className="text-danger mt-1">{errors.hobby}</div>}
        </div>

        {/* Address */}
        <div className="mb-3">
          <label className="form-label fw-bold">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>
          {errors.address && <div className="text-danger mt-1">{errors.address}</div>}
        </div>

        {/* City */}
        <div className="mb-3">
          <label className="form-label fw-bold">City</label>
          <select
            name="city"
            className="form-select"
            value={formData.city}
            onChange={handleChange}
          >
            <option value="" disabled>
              --Select City--
            </option>
            <option value="New York">New York</option>
            <option value="Los Angeles">Los Angeles</option>
            <option value="Chicago">Chicago</option>
          </select>
          {errors.city && <div className="text-danger mt-1">{errors.city}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {editIndex !== null ? "Update" : "Submit"}
        </button>
      </form>

      {/* Table */}
      <div className="mt-5">
        <h2>Submitted Data</h2>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>Hobby</th>
              <th>Address</th>
              <th>City</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {submittedData.length > 0 ? (
              submittedData.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.username}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.phone}</td>
                  <td>{data.gender}</td>
                  <td>{data.hobby.join(", ")}</td>
                  <td>{data.address}</td>
                  <td>{data.city}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleEdit(index)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center">
                  No data submitted yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;