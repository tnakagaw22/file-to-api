import axios from "axios";

const getMappingDefinitions = async () => {
  // let res = await axios.get(`${config.apiUrl}/${name}?${query}`);
  let res = await axios.get(`http://localhost:5000/api/mapping-definitions/`);

  return res.data;
};

const getMappingDefinition = async (id) => {
  let res = await axios.get(
    `http://localhost:5000/api/mapping-definitions/${id}`
  );

  return res.data;
};

const saveMappingDefinition = async (mappingDefinition) => {
  if (mappingDefinition.id) {
    const res = await axios.put(
      `http://localhost:5000/api/mapping-definitions/${mappingDefinition.id}`,
      mappingDefinition
    );
    return res.data;
  } else {
    const res = await axios.post(
      `http://localhost:5000/api/mapping-definitions/`,
      mappingDefinition
    );
    return res.data;
  }
};

const deleteMappingDefinition = async (id) => {
  let res = await axios.delete(
    `http://localhost:5000/api/mapping-definitions/${id}`
  );

  // return res.data;
};

const uploadFile = async (formData) => {
  await axios.post(`http://localhost:5000/api/upload`, formData);
}

const stall = async (stallTime = 3000) => {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
};

module.exports = {
  getMappingDefinitions,
  getMappingDefinition,
  saveMappingDefinition,
  deleteMappingDefinition,
  uploadFile
};
