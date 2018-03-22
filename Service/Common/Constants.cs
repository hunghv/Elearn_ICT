using System;

namespace Service.Common
{
    public class Constants
    {
        public static int GetUserId()
        {
            return 1;
        }
        public static DateTime GetDateNow()
        {
            return DateTime.Now;
        }

        public static class Configuration
        {
            
        }

        public static class ErrorMessageCodes
        {
            public static readonly string NoRecordsFound = "2";
            public static readonly string NoRecordsFoundMessage = "No records found.";
        }

        public static class Roles
        {

        }

        public static class Months
        {
            public static readonly string Mon1 = "Jan";
            public static readonly string Mon2 = "Feb";
            public static readonly string Mon3 = "Mar";
            public static readonly string Mon4 = "Apr";
            public static readonly string Mon5 = "May";
            public static readonly string Mon6 = "Jun";
            public static readonly string Mon7 = "Jul";
            public static readonly string Mon8 = "Aug";
            public static readonly string Mon9 = "Sep";
            public static readonly string Mon10 = "Oct";
            public static readonly string Mon11 = "Nov";
            public static readonly string Mon12 = "Dec";
        }

    }
}
