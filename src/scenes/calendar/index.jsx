import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { colorTokens } from "../../themes";
import Swal from "sweetalert2";
import CalendarEvents from "../../data/CalendarEvents";
const Calendar = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleaddEventToCalendar = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:5050/submitcalendarEvent",
        values
      );
      console.log(response.data);
      setSuccessMessage("Event Added successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error - User not added");
    }
  };

  const handleditEventToCalendar = async (values) => {
    try {
      let eventId = values.id;

      let eventData = {
        title: values.title,
        start: values.start,
        end: values.end,
      };

      const response = await axios.put(
        `http://localhost:5050/updateCalendarEvent/${eventId}`,
        eventData
      );

      console.log(response.data);
      setSuccessMessage("Event Updated successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error - Event not updated");
    }
  };

  const handleDeleteEventFromCalendar = async (selected) => {
    try {
      let eventId = selected.id;

      const response = await axios.delete(
        `http://localhost:5050/deletecalendarEvent/${eventId}`
      );
      console.log(response.data);
      setSuccessMessage("Event Deleted successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage("Error - Event not deleted");
    }
  };

  const theme = useTheme();
  const colors = colorTokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const currentDate = new Date();
    const selectedDate = new Date(selected.startStr);
    // Extract year, month, and day from the current date
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // Extract year, month, and day from the selected date
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth();
    const selectedDay = selectedDate.getDate();

    if (
      selectedYear > currentYear ||
      (selectedYear === currentYear && selectedMonth > currentMonth) ||
      (selectedYear === currentYear &&
        selectedMonth === currentMonth &&
        selectedDay >= currentDay)
    ) {
      Swal.fire({
        title: "Add an Event",
        html: `
    <input id="eventName" class="swal2-input" placeholder="Event Name" autofocus>
    <input id="startDate" class="swal2-input" type="date" placeholder="Start Date">
    <input id="endDate" class="swal2-input" type="date" placeholder="End Date">
  `,
        showCancelButton: true,
        confirmButtonColor: "#3A833A",
        confirmButtonText: "Add Event",
        showLoaderOnConfirm: true,
        background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
        color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
        preConfirm: async (input) => {
          const eventName = document.getElementById("eventName").value;
          const startDate = document.getElementById("startDate").value;
          const endDate = document.getElementById("endDate").value;

          if (!eventName || !startDate || !endDate) {
            Swal.showValidationMessage("Please fill in all fields");
            return;
          }

          try {
            calendarApi.addEvent({
              id: `${selected.dateStr}-${eventName}`,
              title: eventName,
              start: startDate,
              end: endDate,
              allDay: true,
            });

            await handleaddEventToCalendar({
              title: eventName,
              start: startDate,
              end: endDate,
            });
          } catch (error) {
            Swal.showValidationMessage(`Request failed: ${error}`);
          }
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Event Added!",
            icon: "success",
            confirmButtonColor: "#3A833A",
            background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
            color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
          });
        }
      });

      const calendarApi = selected.view.calendar;
      calendarApi.unselect();
    } else {
      //alert("You can't create an event in the past");

      Swal.fire({
        title: "Error!",
        text: "You can't add an event before the current date",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
        background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
        color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
      });
    }
  };

  const handleEventClick = (selected) => {
    Swal.fire({
      title: "What would you like to do with this event?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: "Cancel",
      background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
      color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
      html: `
        <button id="deleteButton" class="swal2-confirm swal2-styled" style="background-color: #3085d6;">Delete</button>
        <button id="editButton" class="swal2-confirm swal2-styled" style="background-color: #3A833A;">Edit</button>
      `,
      allowOutsideClick: false,
      willClose: () => {
        // Clean up event listeners when the modal is closed
        document
          .getElementById("deleteButton")
          .removeEventListener("click", handleDeleteClick);
        document
          .getElementById("editButton")
          .removeEventListener("click", handleEditClick);
      },
    });

    const handleDeleteClick = () => {
      handleDeleteEvent(selected);
    };

    const handleEditClick = () => {
      handleEditEvent(selected);
    };

    document
      .getElementById("deleteButton")
      .addEventListener("click", handleDeleteClick);
    document
      .getElementById("editButton")
      .addEventListener("click", handleEditClick);
  };

  const handleDeleteEvent = (selected) => {
    Swal.fire({
      title: "Are you sure you want to delete this event?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
      color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
      preConfirm: async () => {
        try {
          selected.event.remove();

          await handleDeleteEventFromCalendar({
            id: selected.event.id,
          });
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Event Deleted!",
          icon: "success",
          confirmButtonColor: "#3A833A",
          background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
          color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
        });
      }
    });
  };

  const handleEditEvent = (selected) => {
    const originalTitle = selected.event.title;
    const originalStartDate = new Date(
      selected.event._instance.range.start.getTime()
    )
      .toISOString()
      .split("T")[0];
    const originalEndDate = new Date(
      selected.event._instance.range.end.getTime() - 1
    )
      .toISOString()
      .split("T")[0];

    Swal.fire({
      title: "Edit Event",
      html: `
      <input id="eventName" class="swal2-input" placeholder="Event Name" value="${originalTitle}" autofocus>
      <input id="startDate" class="swal2-input" type="date" placeholder="Start Date" value="${originalStartDate}">
      <input id="endDate" class="swal2-input" type="date" placeholder="End Date" value="${originalEndDate}">
      `,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
      color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
      preConfirm: async () => {
        const eventName = document.getElementById("eventName").value;
        const startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        if (!eventName || !startDate || !endDate) {
          Swal.showValidationMessage("Please fill in all fields");
          return;
        }
        
        // Determine which properties have been updated
        const updatedProperties = {};
        if (eventName !== originalTitle) {
          selected.event.setProp("title", eventName);
          updatedProperties.title = eventName;
        } else {
          updatedProperties.title = originalTitle;
        }
        if (startDate !== originalStartDate) {
          selected.event.setStart(startDate);
          updatedProperties.start = startDate;
        } else {
          updatedProperties.start = originalStartDate;
        }
        if (endDate !== originalEndDate) {
          let end = new Date(endDate);
          selected.event.setEnd(end.setDate(end.getDate() + 1));
          updatedProperties.end = endDate;
        } else {
          updatedProperties.end = originalEndDate;
        }

        try {
          // Call the API to update the event with the updated properties
          await handleditEventToCalendar({
            id: selected.event.id,
            ...updatedProperties,
          });
        } catch (error) {
          Swal.showValidationMessage(`Request failed: ${error}`);
        }

        // Return the updated event details
        return updatedProperties;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Event Updated!",
          icon: "success",
          confirmButtonColor: "#3A833A",
          background: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
          color: theme.palette.mode === "light" ? "#000000" : "#FFFFFF",
        });
      }
    });
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="" />
      <Box display="flex" justifyContent="space-between">
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  color: theme.palette.mode === "light" ? "#FFFFFF" : "#000000",
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? "#3676D1 !important"
                      : "#f6da54",
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box
          flex="1 1 100%"
          ml="15px"
          sx={{
            "& .fc-daygrid-event": {
              backgroundColor: "#3676D1",
            },
            "& .fc-daygrid-event-dot": {
              backgroundColor: "#3676D1",
            },
            "& .fc-daygrid-event-title": {
              color: "#3676D1",
            },
            "& .fc-daygrid-event-time": {
              color: "#3676D1",
            },
            "& .fc-button-primary": {
              backgroundColor:
                theme.palette.mode === "light" ? "#3676D1" : colors.grey[400],
              borderColor:
                theme.palette.mode === "light" ? "#3676D1" : colors.grey[400],
            },
            "& .fc-button:active": {
              backgroundColor:
                theme.palette.mode === "light" ? "#1F75FE" : colors.grey[400],
              borderColor:
                theme.palette.mode === "light" ? "#1F75FE" : colors.grey[400],
            },

            "& .fc-button:focus": {
              boxShadow: "0px 0px 0px #FFFFFF",
            },
            "& .fc .fc-button-primary:not(:disabled).fc-button-active": {
              backgroundColor:
                theme.palette.mode === "light" ? "#1F75FE" : "#000000",
              borderColor:
                theme.palette.mode === "light" ? "#1F75FE" : "#000000",
            },
            ".fc .fc-button-primary:not(:disabled):hover": {
              backgroundColor:
                theme.palette.mode === "light" ? "#1F75FE" : "#000000",
              borderColor:
                theme.palette.mode === "light" ? "#1F75FE" : "#000000",
            },
            "& .fc .fc-button-primary:disabled": {
              backgroundColor:
                theme.palette.mode === "light" ? "#3676D1" : "#000000",
              borderColor:
                theme.palette.mode === "light" ? "#3676D1" : "#000000",
            },
            "& .fc-button-primary:not(:disabled).fc-button-active:focus": {
              boxShadow: "0px 0px 0px #FFFFFF",
            },
            "& .fc-button-primary:not(:disabled).fc-button-active": {
              boxShadow: "0px 0px 0px #FFFFFF",
            },

            "& .fc .fc-button-primary:not(:disabled):active:focus": {
              boxShadow: "0px 0px 0px #FFFFFF",
            },
          }}
        >
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            events={CalendarEvents()}
          />
        </Box>
      </Box>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {/* Render error message */}
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
    </Box>
  );
};

export default Calendar;
