import Key from "../../enums/Key"

export default function Cell({
    coordinates,
    value,
    given,
    violated,
    active,
    handleChange,
    handleFocus,
    handleMove
}) {
    const classes = ['cell']
    const cellValue = value > 0 ? value : ''

    given && classes.push('given')
    violated && classes.push('error')

    const onChange = (e) => {
        const value = Number(e.target.value) || 0
        handleChange(value > 9 ? value % 10 : value)
    }

    const handleKeyDown = (e) => {
        if ([Key.ENTER, Key.ESC].includes(e.key)) {
            handleFocus(false)
        } else if (Key.isArrow(e.key)) {
            e.preventDefault()
            handleMove(e.key)
        }
    }

    return <span className={classes.join(' ')} data-index={coordinates.cell} onClick={handleFocus}>
        {
            active && !given
                ? <input
                    type='number'
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    onBlur={() => handleFocus(false)}
                    autoFocus
                />
                : cellValue
        }
    </span>
}