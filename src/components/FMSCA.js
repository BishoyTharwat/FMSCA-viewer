import { useEffect, useState } from 'react';
import '../style/style.css';
import { FaSearch } from "react-icons/fa";
import {getData , handlePageChange, handleSearchChange} from '../utils/utils'
export default function FMSCA() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const rowsPerPage = 10; 
  
    useEffect(() => {
      getData(setData , setLoading);
    }, []);

    const filteredData = data.filter(item => 
      item.created_dt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.data_source_modified_dt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.entity_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.operating_status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.legal_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.usdot_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dba_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.physical_address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.out_of_service_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.power_units.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.mc_mx_ff_number.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const startIdx = (currentPage - 1) * rowsPerPage;
    const endIdx = startIdx + rowsPerPage;
    const currentData = filteredData.slice(startIdx, endIdx);
  
    return (
      <div className="App">
        <h1>
          FMSCA viewer
        </h1>
        <p>BY Bishoy Tharwat</p>
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              className="input-search"
              placeholder="Type to Search..."
              value={searchQuery}
              onChange={(event) =>
                handleSearchChange(event, setSearchQuery, setCurrentPage)
              }
            />
            <a href="#">
              <FaSearch />
            </a>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Created_DT</th>
                <th>Modified_DT</th>
                <th>Entity</th>
                <th>Operating Status</th>
                <th>Legal Name</th>
                <th>DBA Name</th>
                <th>Physical Address</th>
                <th>Phone</th>
                <th>DOT</th>
                <th>MC/MX/FF</th>
                <th>Power Units</th>
                <th>Out of Service Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12" className="loading">
                    Loading...
                  </td>
                </tr>
              ) : (
                currentData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.created_dt}</td>
                    <td>{item.data_source_modified_dt}</td>
                    <td>{item.entity_type}</td>
                    <td>{item.operating_status}</td>
                    <td>{item.legal_name}</td>
                    <td>{item.dba_name}</td>
                    <td>{item.physical_address}</td>
                    <td>{item.phone}</td>
                    <td>{item.usdot_number}</td>
                    <td>{item.mc_mx_ff_number}</td>
                    <td>{item.power_units}</td>
                    <td>{item.out_of_service_date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button
            onClick={() => handlePageChange(1, setCurrentPage)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1, setCurrentPage)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1, setCurrentPage)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(totalPages, setCurrentPage)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    );
}
