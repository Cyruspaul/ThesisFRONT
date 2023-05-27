import {createRouter, createWebHistory} from 'vue-router'
import NotFound from "@/views/NotFound.vue";
import LoginPage from "@/views/LoginPage.vue";
import MainLayout from "@/layout/MainLayout.vue";
import ClassManagement from "@/views/Teacher/Grade/ClassManagement.vue";
import CourseManagement from "@/views/Teacher/Course/CourseManagement.vue";
import RemarkManagement from "@/views/Teacher/File/RemarkManagement.vue";
import TeacherDashboard from "@/views/Teacher/TeacherDashboard.vue";
import EventMessageView from "@/views/Teacher/Messages/EventMessageView.vue";
import NotificationView from "@/views/Teacher/Messages/NotificationView.vue";
import TasksView from "@/views/Teacher/Messages/TasksView.vue";
import TimeTablePage from "@/views/Teacher/TimeTable/TimeTablePage.vue";
import GradeManagement from "@/views/Teacher/Grade/GradeManagement.vue";
import StatisticComp from "@/components/StatisticComp.vue";
import ListCourses from "@/views/Teacher/Course/ListCourses.vue";
import CourseDescription from "@/views/Teacher/Course/CourseDescription.vue";
import ClassDescription from "@/views/Teacher/Grade/ClassDescription.vue";
import SupCourseManagement from "@/views/Supervisor/SupCourseManagement.vue";
import CurriculumManagement from "@/views/Supervisor/CurriculumManagement.vue";
import ClassesView from "@/views/Supervisor/ClassesView.vue";
import StudentEdit from "@/views/Supervisor/StudentEdit.vue";
import SupGradeManagement from "@/views/Supervisor/SupGradeManagement.vue";
import PaikeView from "@/views/Supervisor/TeacherView.vue";
import SupTasksView from "@/views/Supervisor/SupTasksView.vue";
import SupNotificationView from "@/views/Supervisor/SupNotificationView.vue";
import SupEventMessageView from "@/views/Supervisor/SupEventMessageView.vue";
import StudentBasicLayout from "@/views/Student/Course/StudentHomePage";
import store from "@/store";
import {studentLinks, supervisorSideBarLinks, teacherSideBarLinks} from "@/router/routerLinks";
import EventHome from "@/views/Student/Register/Events/EventHome";
import EventDetail from "@/views/Student/Course/EventDetail.vue";
import StudentTimeTable from "@/views/Student/Course/StudentTimeTable.vue";
import AnnouncementPage from "@/views/Student/Course/AnnouncementPage";
import Courseplan from "@/views/Student/Course/Courseplan";
import SelectiveCourse from "@/views/Student/Course/SelectiveCourse";
import StudentGrade from "@/views/Student/Course/StudentGrade";
import GraduationPage from "@/views/Student/Course/GraduationPage";
import StudentInfoPage from "@/views/Student/Course/StudentInfoPage";
import {Notification} from '@arco-design/web-vue'
import SupCollegeManagement from "@/views/Supervisor/SupCollegeManagement";
import SupMajormanagement from "@/views/Supervisor/SupMajormanagement";
import CurriculumCreate from "@/views/Supervisor/CurriculumCreate";
import supNotificationCreate from "@/views/Supervisor/supNotificationCreate";
import StudentRegister from "@/views/Student/Register/StudentRegister";
import Account from "@/views/Supervisor/Account";
import Application from "@/views/Supervisor/Application";
import SupClassManagement from "@/views/Supervisor/SupClassManagement";
import SupGradeList from "@/views/OTHERPAGES/SupGradeList";
import SupTimeTable from "@/views/Supervisor/SupTimeTable";
//TEACHER ROUTES
const teacherRoutes = {
    path: '/jwxt/t',
    name: 'teacher',
    redirect: to => {
        return { path: '/jwxt/dashboard'}
    },
    components: {
        default: MainLayout
    },
    meta: {"links": teacherSideBarLinks},
    children: [
        {
            path: 'dashboard',
            name: 'teacher_dashboard',
            component: TeacherDashboard,
        },
        {
            path: 'timetable',
            name: 'teacher_timetable',
            redirect: "/jwxt/timetable",
            components: {
                default: TimeTablePage
            },
            children: [
                {
                    path: '',
                    name: 'teacher_timetable',
                    component: ListCourses,
                },
                {
                    path: ':id',
                    name: 'teacher_timetable_details',
                    component: StatisticComp,
                }
            ]
        },
        {
            path: 'course',
            name: 'teacher_course_management',
            components: {
                default: CourseManagement
            },
            children: [
                {
                    path: '',
                    name: 'teacher_course_management',
                    component: ListCourses,
                },
                {
                    path: ':id',
                    name: 'teacher_course_management_details',
                    component: CourseDescription,
                }
            ]
        },
        {
            path: 'grade',
            name: 'teacher_grade_management',
            component: GradeManagement,
        },
        // {
        //   path: 'file',
        //   name: 'teacher_file_management',
        //   component: FileManagement,
        // },
        {
            path: 'class',
            name: 'teacher_class_management',
            redirect: "class",
            children: [
                {
                    path: '',
                    name: 'teacher_class_management',
                    component: ClassManagement
                },
                {
                    path: ':id',
                    name: 'teacher_class_management_details',
                    component: ClassDescription
                }
            ]
        },
        {
            path: 'remark',
            name: 'teacher_remark_management',
            component: RemarkManagement,
        },
        {
            path: 'events',
            name: 'teacher_events',
            component: EventMessageView,
        },
        {
            path: 'announcements',
            name: 'teacher_announcements',
            component: NotificationView,
        },
        {
            path: 'tasks',
            name: 'teacher_tasks',
            component: TasksView,
        },
    ]
}

//SUPERVISOR ROUTES
const supervisorRoutes = {
    path: '/jwxt/ad',
    name: 'welcomesup',
    components: {
        default: MainLayout
    }, redirect: to => {
        return { path: '/jwxt/dashboard'}
    },
    children: [
        {
            path: 'dashboard',
            name: 'supervisor_dashboard',
            component: StatisticComp
        },
        {
            path: 'course_management',
            name: 'supervisor_course_management',
            component: SupCourseManagement
        },
        {
            path: 'dept_management',
            name: 'supervisor_dept_management',
            component: SupCollegeManagement
        },
        {
            path: 'curriculum_management',
            name: 'supervisor_curriculum_management',
            component: CurriculumManagement,
        },
        {
            path: 'curriculum_management/create/:majorNo/:studyLevel',
            name: 'supervisor_curriculum_create',
            component: CurriculumCreate,
            props:true
        },

        {
            path: 'student_management/:id',
            name: 'supervisor_student_details',
            component: ()=>import("@/views/Supervisor/StudentEdit.vue"),
        },
        {
            path: 'student_management/edit/:id',
            name: 'supervisor_student_edit',
            component: StudentEdit,
        },
        {
            path: 'student_management',
            name: 'supervisor_student_management',
            component: ClassesView,
        },
        {
            path: 'major_management',
            name: 'supervisor_major_management',
            component: SupMajormanagement,
        },
        {
            path: 'class_management',
            name: 'supervisor_class_management',
            component: SupClassManagement,
        },
        {
            path: 'class_management/:class/grade',
            name: 'supervisor_class_grade',
            component: SupGradeManagement,
        },
        {
            path: 'class_management/:class/timetable',
            name: 'supervisor_class_timetable',
            component: SupTimeTable,
        },

        {
            path: 'events',
            name: 'supervisor_events',
            component: SupEventMessageView,
        },
        {
            path: 'announcements',
            name: 'supervisor_announcements',
            component: SupNotificationView,
        },
        {
            path: 'announcements/:op',
            name: 'supervisor_announcements_operation',
            component: supNotificationCreate,
            props:true
        },
        {
            path: 'announcements/:op/:id',
            name: 'supervisor_announcements_edit',
            component: supNotificationCreate,
            props:true
        },
        {
            path: 'tasks',
            name: 'supervisor_tasks',
            component: SupTasksView,
        },
        {
            path: 'teacher',
            name: 'supervisor_teacher_management',
            component: PaikeView,
        },
        {
            path: 'account',
            name: 'supervisor_account_management',
            component: Account,
        },
        {
            path: 'application',
            name: 'supervisor_application_management',
            component: Application,
        },
        {
            path: 'file',
            name: 'supervisor_file_management',
            component: PaikeView,
        },
        {
            path: 'timetable',
            name: 'supervisor_timetable_management',
            component: PaikeView,
        },
    ],
    meta: {"links": supervisorSideBarLinks}
}

//STUDENT ROUTES
const studentRoutes = {
    path: '/jwxt/stu',
    name: 'student',
    redirect: to => {
        return { path: '/jwxt/dashboard'}
    },
    components: {
        default: MainLayout
    },
    meta: {"links": studentLinks},
    children: [
            {
                path: 'dashboard',
                name: 'student_dashboard',
                component: StudentBasicLayout,
                meta: {
                    auth: true
                }
            },
            {
                path: 'events',
                name: 'student_events',
                component: EventHome,
                meta: {
                    auth: true
                }
            },
            {
                path: 'publications/:idx',
                name: 'pubDetails',
                component: EventDetail,
                meta: {
                    auth: true
                }
            },
            {
                path: 'publications',
                name: 'student_publications',
                component: AnnouncementPage,
                meta: {
                    auth: true
                }
            },
            {
                path: 'timetable',
                name: 'student_timetable',
                component: StudentTimeTable,
                meta: {
                    auth: true
                }
            },
            {
                path: 'course',
                name: 'student_course',
                component: Courseplan,
                meta: {
                    auth: true
                }
            },
            {
                path: 'course/:cid',
                name: 'student_course_details',
                component: CourseDescription,
                meta: {
                    auth: true
                }
            },
            {
                path: 'selective',
                name: 'student_classselect',
                component: SelectiveCourse,
                meta: {
                    auth: true
                }
            },
            {
                path: 'grade',
                name: 'student_grade',
                component: StudentGrade,
                meta: {
                    auth: true
                }
            },
            {
                path: 'graduation',
                name: 'student_graduation',
                component: GraduationPage,
                meta: {
                    auth: true
                }
            },
            {
                path: 'comment',
                name: 'student_comment',
                component: StatisticComp,
                meta: {
                    auth: true
                }
            },
            {
                path: 'account',
                name: 'student_infos',
                component: StudentInfoPage,
                meta: {
                    auth: true
                }
            },
        ]
}


const routes = [        {
    path: '/',
    name: 'home',
    component: LoginPage
},      {
    path: '/register',
    name: 'register',
    component: StudentRegister
},
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
].concat(studentRoutes).concat(supervisorRoutes).concat(teacherRoutes)


const ROLES = ["444444", "555555", "333333", "111111", "222222"]
// .concat(toRaw(store.state.routes))
const CHECK_ROLE_CODE = function (role) {
    return ROLES.includes(role)
}
console.log(routes)
export const convertRoleCode = function (permission) {
    if (CHECK_ROLE_CODE(permission)) {
        switch (permission) {
            case "111111":
                return "ADMIN"
            case "222222":
                return "TEACHER"
            case "333333":
                return "APPLICANT"
            case "444444":
                return "STUDENT"
            case "555555":
                return "STUDENT"
            default:
                return undefined
        }
    }
}


let router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((async (to,from, next) => {
    const role = convertRoleCode(store.getters.getuserInfo.role)

    console.log(to)
    if(to.path === '/' ) //|| to.name === 'register'
        next()
    else{
        if (store.getters.getuserInfo.role === undefined) {
            await store.dispatch('logout')
            Notification.error({content:'You need to log in please !!!'})
            next('/')
        }else {
            next()
        }
    }


    // console.log(role)
    // console.log(to.name)
    // console.log("ROUTES FROM INDEX ", router.options.routes)
}))


export default router
