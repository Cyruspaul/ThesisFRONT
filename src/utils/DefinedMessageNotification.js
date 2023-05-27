import {Message, Notification,Modal} from "@arco-design/web-vue";
import {h} from "vue";


const showNotification = function (response) {

    // console.log("response", response)
    if (response.code === 2000) {
        Notification.success({
            closable: true,
            content: response.message
        })
    } else if (response.code === 1000) {
        Notification.info({
            closable: true,
            content: response.message
        })
    } else if (response.code === 3000) {
        Notification.warning({
            closable: true,
            content: response.message
        })
    } else if( response.code === undefined) {
        Notification.error({
            closable: true,
            content: response.message ||  response.Message || "Server Error"
        })
    }else {
        Notification.error({
            closable: true,
            content: response.message ||  response.Message || "Server Error"
        })
    }
}

const showMessage = function (response) {
    if (response.code === 2000) {
        Message.success({
            closable: true,
            content: response.message
        })
    } else if (response.code === 1000) {
        Message.info({
            closable: true,
            content: response.message
        })
    } else if (response.code === 3000) {
        Message.warning({
            closable: true,
            content: response.message
        })
    } else {
        Message.error({
            closable: true,
            content: response.message
        })
    }
}

const showVALIDNotification = function (response){
    if (response.code === 2000) {
        Notification.success({
            closable: true,
            content: response.message
        })
    }
}

const showModalWarning = function (response){
    if (response.code >=3000){
        Modal.warning({
            content: h('p',
                {class:"text-center fs-4 m-0 p-0"},
                [response.message]),
            title:"注意",

            titleAlign:"start",
            alignCenter:true,
            simple: true,
            hideCancel:true,
            maskClosable:true,
            escToClose:true,
            closable:true
        })
    }

}
export {showNotification, showMessage,showVALIDNotification,showModalWarning}