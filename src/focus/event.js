import {focusHandler} from '../main'
let registered =false
let actions = []
const KEY_CODE = {
    37: 'LEFT',
    38: 'UP',
    39: 'RIGHT',
    40: 'DOWN'
}
export const enableNavigation = (actionCB) => {
    console.error('registed for navigation')
    if (registered) {
        const index = actions.findIndex(item => item.id === actionCB.id)
        if (index > -1) {
            actions[index] = actionCB
        } else {
            actions.push(actionCB)
        }

    } else {
        registered = true
        actions.push(actionCB)
        window.addEventListener('keydown', (event) => {            
            [1,2,3].some(item=>{console.error(item); return item===2})
            actions.some(action => {
                console.error('loop  executed')
                if (!action.preCondition || action.preCondition()){
                    return action[KEY_CODE[event.keyCode]] && action[KEY_CODE[event.keyCode]]()
                }
                    return false
            })

        });
    }

}

export const registerFocus = (callback) => {    
    focusHandler.$on('FOCUS_CHANGE',callback)
}
export const unRegisterFocus = (callback) => {
    focusHandler.$off('FOCUS_CHANGE',callback)
}