import {
    IconArchive, IconAttachment, IconBarChart,
    IconBook,
    IconBookmark,
    IconCalendar,
    IconCalendarClock,
    IconCheck, IconCloudDownload, IconCommon,
    IconDashboard, IconExperiment, IconFile,
    IconHome,
    IconMessage, IconNotification,
    IconStar, IconStorage, IconUnorderedList, IconUser,
    IconUserGroup
} from "@arco-design/web-vue/es/icon";
import ListItem from "@/components/ListItem.vue";
import StatisticComp from "@/components/StatisticComp.vue";
import StudentBasicLayout from "@/views/Student/Course/StudentHomePage";

const studentLinks = [
    {
        key: 'student_dashboard',
        title: 'Dashboard',
        icon: IconHome,
        subItems: []
    },
    {
        key: 'student_publications',
        title: 'Publications',
        icon: IconNotification,
        subItems: []
    },
    // {
    //     key: 'student_message',
    //     title: 'Messages',
    //     icon: IconMessage,
    //     subItems: [
    //         {
    //             key: 'student_events',
    //             title: '活动',
    //             icon: IconHome,
    //             subItems: []
    //         },
    //
    //     ]
    // },
    {
        key: 'student_timetable',
        title: 'Timetable',
        icon: IconCalendar,
        subItems: []
    },
    {
        key: 'student_curriculum',
        title: 'Curriculum',
        icon: IconBarChart,
        subItems: [
            {
                key: 'student_course',
                title: 'Course Plan',
                icon: IconStorage,
                subItems: []
            },
            {
                key: 'student_classselect',
                title: 'Selective Course',
                icon: IconAttachment,
                subItems: []
            }
        ]
    },
    {
        key: 'student_class',
        title: 'Class',
        icon: IconBookmark,
        subItems: [
            {
                key: 'student_grade',
                title: 'My Grade',
                icon: IconFile,
                subItems: []
            },
            {
                key: 'student_graduation',
                title: 'Graduation Plan',
                icon: IconArchive,
                subItems: []
            },
            // {
            //     key: 'student_comment',
            //     title: 'Teacher Comment',
            //     icon: IconHome,
            //     subItems: []
            // }
        ]
    },
    {
        key: 'student_infos',
        title: 'Account',
        icon: IconUser,
        subItems: []
    }
]


const adminSideBarLinks = []

const supervisorSideBarLinks = [
    {
        key: 'supervisor_dashboard',
        title: '我的',
        icon: IconDashboard,
        subItems: []
    },
    {
        key: 'supervisor_eventsource',
        title: '消息服务',
        icon: IconCalendarClock,
        subItems: [
            // {
            //     key: 'supervisor_events',
            //     title: '活动列表',
            //     icon: IconCalendar,
            // },
            {
                key: 'supervisor_announcements',
                title: '通告列表',
                icon: IconCalendar,
            },
            {
                key: 'supervisor_tasks',
                title: '我的任务',
                icon: IconCheck,
            },
        ],
    },
    {
        key: 'supervisor_dept_maj_management',
        title: '学籍管理',
        icon: IconCommon,
        subItems: [
            {
                key: 'supervisor_dept_management',
                title: '学院管理',
                icon: IconCommon,
                subItems: []
            },
            {
                key: 'supervisor_major_management',
                title: '专业管理',
                icon: IconExperiment,
                subItems: []
            },
            {
                key: 'supervisor_curriculum_management',
                title: '教学计划管理',
                icon: IconCalendar,
                subItems: [
                    // {
                    //     key: 'Jiaoxue_List',
                    //     title: '教学计划管理 List',
                    //     icon: IconCalendar,
                    //     subItems: []
                    // },
                ]
            },
            {
                key: 'supervisor_course_management',
                title: '课程管理',
                icon: IconArchive,
                subItems: []
            },
        ]
    },

    {
        key: 'supervisor_user_management',
        title: '用户管理',
        icon: IconUserGroup,
        subItems: [
            {
                key: 'supervisor_teacher_management',
                title: '老师管理',
                icon: IconUserGroup,
                subItems: []
            },
            {
                key: 'supervisor_student_management',
                title: '学生管理',
                icon: IconUserGroup,
                subItems: []
            },{
                key: 'supervisor_application_management',
                title: '招生管理',
                icon: IconCloudDownload,
                subItems: []
            },
            {
                key: 'supervisor_account_management',
                title: '账号管理',
                icon: IconUserGroup,
                subItems: []
            },
            
        ]
    },
    {
        key: 'supervisor_class_management',
        title: '班级管理',
        icon: IconUnorderedList,
        subItems: []
    },


    // {
    //     key: 'supervisor_class_mana',
    //     title: '班级管理',
    //     icon: IconUnorderedList,
    //     subItems: [
    //         {
    //         key: 'supervisor_class_management',
    //         title: '班级管理',
    //         icon: IconUnorderedList,
    //         subItems: []
    //     },    {
    //             key: 'supervisor_timetable_management',
    //             title: '课表管理',
    //             icon: IconCalendarClock,
    //             subItems: []
    //         }, {
    //             key: 'supervisor_grade_management',
    //             title: '成绩管理',
    //             icon: IconFile,
    //             subItems: []
    //         },
    //     ]
    // },

    // {
    //     key: 'supervisor_file_management',
    //     title: '文件管理',
    //     icon: IconCalendar,
    //     subItems: []
    // }
    //     key: 'supervisor_evaluation_management',
    //     title: '评教管理',
    //     icon: IconCalendar,
    //     subItems: [
    //         {
    //             key: 'supervisor_student_evaluation',
    //             title: '学生评教管理',
    //             icon: IconCalendar,
    //         },
    //         {
    //             key: 'supervisor_teacher_evaluation',
    //             title: '老师评教管理',
    //             icon: IconCalendar,
    //         },]
    // },
]


const teacherSideBarLinks = [
    {
        key: 'teacher_dashboard',
        title: 'Dashboard',
        icon: IconDashboard,
        subItems: []
    },
    {
        key: 'teacher_timetable',
        title: '课表',
        icon: IconCalendar,
        subItems: []
    },
    {
        key: 'teacher_eventsource',
        title: '消息服务',
        icon: IconCalendarClock,
        subItems: [
            {
                key: 'teacher_events',
                title: '活动列表',
                icon: IconCalendar,
            },
            {
                key: 'teacher_announcements',
                title: '通告列表',
                icon: IconCalendar,
            },
            // {
            //     key: 'teacher_tasks',
            //     title: '任务管理',
            //     icon: IconCheck,
            // },
        ],
    },
    {
        key: 'teacher_course_management',
        title: '课程管理',
        icon: IconBook,
        subItems: []
    },
    {
        key: 'teacher_class_management_home',
        title: '班级管理',
        icon: IconUserGroup,
        subItems: [
            {
                key: 'teacher_class_management',
                title: '班级列表',
                icon: IconUserGroup,
            }, {
                key: 'teacher_grade_management',
                title: '成绩管理',
                icon: IconUserGroup,
            },
        ]
    },
    // {
    //     key: 'teacher_file_management',
    //     title: '文件管理',
    //     icon: IconFile,
    //     subItems: []
    // },
    {
        key: 'teacher_remark_management',
        title: '评教管理',
        icon: IconStar,
        subItems: []
    },
]

export { teacherSideBarLinks, supervisorSideBarLinks, studentLinks}