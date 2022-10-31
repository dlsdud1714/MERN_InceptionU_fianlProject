const groupByPosition = (schedules) => {
    const initialVal = {};
    return schedules?.reduce((acc, current) => {
      if (!acc[current.positionId]) {
        acc[current.positionId] = [];
      }

      acc[current.positionId].push(current);
      //order emplyees in every group
      acc[current.positionId]?.sort((a, b) =>
        a.firstname > b.firstname ? 1 : -1
      );

      return acc;
    }, initialVal);
  };
  export default groupByPosition