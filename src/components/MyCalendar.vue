<template>
  <Qalendar :config="config" :events="events"/>
</template>

<script>
import {Qalendar} from "qalendar";

export default {
  name: "MyCalender",
  components: {
    Qalendar
  },
  data() {
    return {
      events: [
        // ...
        {
          title: "Advanced algebra",
          with: "Chandler Bing",
          time: {start: "2023-05-05 10:30", end: "2023-05-05 11:30"},
          color: "yellow",
          isEditable: false,
          id: "753944708f0f",
          description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores assumenda corporis doloremque et expedita molestias necessitatibus quam quas temporibus veritatis. Deserunt excepturi illum nobis perferendis praesentium repudiandae saepe sapiente voluptatem!"
        },
        {
          title: "Ralph on holiday",
          with: "Rachel Greene",
          time: {start: "2023-05-06 12:05", end: "2023-05-06 01:03"},
          color: "green",
          isEditable: false,
          id: "5602b6f589fc"
        }
        // ...
      ],
      config: {
        week: {
          nDays: 5 | 7,
          startsOn: "sunday" | "monday",
          scrollToHour: 0,
        },
        isSilent: true,
        eventDialog: {
          isDisabled: false,
          isCustom: false,
        },
        dayBoundaries: {
          start: 0, // integer between 0 and 24
          end: 24, // integer between 0 and 24
        },
        showCurrentTime: true,

        //specific settings for month view
        month: {
          //Hide the days of the next month and previous month in calendar to enhance the appearance
          showTrailingAndLeadingDates: true
        },
        locale: "zh-CN",
        defaultMode: "week",
        disableModes: ['month'],
        style: {
          colorSchemes: {
            meetings: {
              color: "#fff",
              backgroundColor: "#131313",
            },
            sports: {
              color: "#fff",
              backgroundColor: "#ff4081",
            },
          },
        },

      }
    }
  }
}
</script>

<style scoped>

</style>