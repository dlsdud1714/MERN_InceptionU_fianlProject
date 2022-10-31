import moment from "moment";

const calculateWeekHrs = (emp) => {
    let calcHrsinWeek = 0;
    const foundEmpScheds = emp?.schedules||emp;
    // console.log(foundEmpScheds)
    foundEmpScheds?.map((sched) => {
      //only work schedule will be added.
      if (sched.workcode === 0) {
        const to = moment(sched?.endtime);
        const from = moment(sched?.starttime);
        calcHrsinWeek +=
          Math.round((moment(to - from).unix() / 60 / 60) * 100) / 100;
      } else {
        console.log("Vacation schedule will not be calculated.");
      }
    });
    return calcHrsinWeek;
  };
  export default calculateWeekHrs
