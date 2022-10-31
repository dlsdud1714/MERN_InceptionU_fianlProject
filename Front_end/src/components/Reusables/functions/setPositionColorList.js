const setPositionColorList = (data) => {
  // let positionLists = [];
  //collect positon from fetched data
  // data?.forEach((prof) => {
  //   typeof prof === "object"
  //     ? positionLists.push(prof.position)
  //     : (positionLists = data);
  // });
  console.log('raw data', data)
  //take out duplicates
  // const positionList = Array.from(new Set(data));
  //order by alphabet
  const orderedPositionList = data.sort((a, b) => (a.name > b.name ? 1 : -1));
  console.log('ordered data', orderedPositionList)
  //color list
  const colorList = [
    "860E2B",
    "6E3CDA",
    "D87400",
    "0070D8",
    "74c239",
    "f9ae08",
    "433F3E",
    "ccbea5",
    "008c9e"
  ];
  // const colorList = ["00b796", "00d2f1", "86269b", "cc0063", "50B700"];

  let newPositonArray = [];
  orderedPositionList?.forEach((pos, i) => {
    if (colorList[i]) {
      newPositonArray.push({ id:pos.profileId, type: pos.name, color: colorList[i] });
    } else {
      newPositonArray.push({
        type: pos,
        color: colorList[i % colorList.length],
      });
    }
  });

  return newPositonArray;
};

export default setPositionColorList;
