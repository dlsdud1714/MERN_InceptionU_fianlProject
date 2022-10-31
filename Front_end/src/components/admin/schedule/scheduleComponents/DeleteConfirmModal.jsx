import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import moment from "moment";
import React, { useContext } from "react";
import { LoginContext } from "../../../authentication/LoginProvider";
import { StoreContext } from "../../../authentication/StoreProvider";

const DeleteConfirmModal = ({
  confirmModalOpen,
  setConfirmModalOpen,
  selectedSched,
  setSelectedSched,
  setSchedModalOpen,
  employeeSched,
  timezone,
}) => {
  const storeId = useContext(StoreContext).store?.Store_idStore;
  const userId = useContext(LoginContext).user?.id;
  const resetEvent = () => {
    setSelectedSched({
      User_idUser: "",
      Store_idStore: "",
      starttime: "",
      endtime: "",
      workcode: 0,
      archived: false,
    });
  };
  const sendDelete = async () => {
    console.log("Archiving schedule");
    const today = moment.tz(moment(), timezone).startOf("day");
    //if vacation clicked, change starttime, otherwise, archeive
    console.log(
      "compare",
      selectedSched,
      today,
      selectedSched.starttime <= today
    );
    if (selectedSched.originalStart <= selectedSched.day) {
      console.log(
        "change endtime",
        today.subtract(1, "days").endOf("day").format()
      );
      const dataToSend = JSON.stringify({
        user: { User_idUser: userId, Store_idStore: storeId },
        data: {
          ...selectedSched,
          starttime: selectedSched.originalStart.format(),
          endtime: selectedSched.day.subtract(1, "days").endOf("day").format(),
        },
      });
      const response = await fetch(`/api/schedule/scheduling`, {
        method: "PATCH",
        headers: { "content-Type": "application/json" },
        body: dataToSend,
      });
      if (response.status === 200) {
        console.log("Succeed in editing schedule");

        resetEvent();
      } else if (response.status === 403) {
        console.log("Message", (await response.json()).message);
      }
    } else {
      const dataToSend = JSON.stringify({
        user: { User_idUser: userId, Store_idStore: storeId },
        data: selectedSched.idSchedule,
      });
      const response = await fetch(`/api/schedule/scheduling`, {
        method: "DELETE",
        headers: { "content-Type": "application/json" },
        body: dataToSend,
      });
      if (response.status === 200) {
        console.log(await response.json());
      } else if (response.status === 403) {
        console.log("Message", (await response.json()).message);
      }
    }
    setSchedModalOpen((pre) => !pre);
    setConfirmModalOpen(false);
  };

  return (
    <Dialog
      open={confirmModalOpen}
      onClose={() => setConfirmModalOpen(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete schedule for{" "}
          {employeeSched?.firstname}, {employeeSched?.lastname} on{" "}
          {moment.tz(selectedSched?.day, timezone).format("MMM Do")}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmModalOpen(false)}>Cancel</Button>
        <Button onClick={sendDelete} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmModal;
