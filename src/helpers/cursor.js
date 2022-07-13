import cursorDot from 'cursor-dot'

export function cursorCustom(){

    const cursor = cursorDot({
        zIndex: 999999,
        diameter: 40,
        borderWidth: 2,
        borderColor: '#fff',
        easing: 4,
        background: 'rgb(255, 255, 255, 0.15)', 
        position: 'absolute'
    })

    const cursorSmall = cursorDot({
        zIndex: 999999,
        diameter: 30,
        borderWidth: 1,
        borderColor: 'transparent',
        easing: 4,
        background: 'rgb(255, 255, 255, 0.40)', 
        position: 'absolute',

    })


    cursor.over("li", {
        background: "rgba(255,255,255,.20)", 
    });

} 

