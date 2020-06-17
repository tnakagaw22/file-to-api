import axios from "axios";

export async function getMappingDefinitions() {
  // let res = await axios.get(`${config.apiUrl}/${name}?${query}`);
  let res = await axios.get(`http://localhost:5000/api/mapping-definitions/`);

  return res.data;
}
export async function getMappingDefinition(id) {
  let res = await axios.get(
    `http://localhost:5000/api/mapping-definitions/${id}`
  );

  return res.data;
}

export async function saveMappingDefinition(mappingDefinition) {
  if (mappingDefinition.id)
    return await axios.put(
      `http://localhost:5000/api/mapping-definitions/${mappingDefinition.id}`,
      mappingDefinition
    );
  else
    return await axios.post(
      `http://localhost:5000/api/mapping-definitions/`,
      mappingDefinition
    );
}

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime));
}
