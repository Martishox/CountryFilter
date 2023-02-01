import React, { useEffect, useState } from "react";


const CountryFilter = () =>{

    const [countries, setCountry] = useState([]);
    const [order, setOrder] = useState("ASC");
    const [region, setRegion] = useState("Oc");
    const [area, setArea] = useState("Only");

    const fetchData = async () => {
        const response = await fetch('https://restcountries.com/v2/all?fields=name,region,area')
        const data = await response.json();
        setCountry(data);
    }

    useEffect(() => {
        fetchData()
    }, [])


    const regionResult = () =>{
      if(region === "Oc")
      {
        const result = countries.filter((country) =>{
          return country.region === "Oceania";
        });
        setCountry(result);
        setRegion("All")
      }
      console.log(region)

      if(region === "All")
      {
        fetchData()
        setRegion("Oc")
      }
    }

    const sorting = (col) =>{
      if(order === "ASC"){
        const sorted = [...countries].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        );
        setCountry(sorted);
        setOrder("DSC")
      }

      if(order === "DSC"){
        const sorted = [...countries].sort((a,b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        );
        setCountry(sorted);
        setOrder("ASC")
      }
    }

    const areaResult = (smallerCountry) =>{
      if(area === "Only")
      {
        const results = countries.filter((country) =>{
          return country.area < smallerCountry;
        });
        setCountry(results);
        setArea("All")
      }
      console.log(area)
      if(area !== "Only")
      {
        fetchData()
        setArea("Only")
      }
    }

    return (
      <div>
        <div className="Container">
          <h1>Country Filter</h1>
          <div className="Buttons">  
            <div>
              <button onClick={() => sorting("name")}>Filter abc</button>
              <button onClick={() => regionResult()}>Filter only Oceania</button>
            </div>
            <button onClick={() => areaResult(65300)}>Filter by area</button>
            
            
          </div>
          {countries.length > 0 && (
            <table>
              <tbody>
                {countries.map((country) => (
                  <tr className="Table_items" key={country.name}>
                    <td key={country.name}><h5>Country:</h5>{country.name}</td>
                    <td key={country.region}><h5>Region:</h5>{country.region}</td>
                    <td key={country.area}><h5>Area:</h5>{country.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    );
}

export default CountryFilter