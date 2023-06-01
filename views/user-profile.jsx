import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { addActivity, updateUserPrefs } from "../store/user.action.js"

const { useSelector, useDispatch } = ReactRedux
const { useState, useEffect } = React

export function UserProfile() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const [prefsToEdit, setPrefsToEdit] = useState({ color: '#2e2e2e', 'bg-color': '#F1F6F9', fullname: '' })
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) setPrefsToEdit(user.prefs)
    }, [])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setPrefsToEdit(prevPrefToEdit => ({ ...prevPrefToEdit, [field]: value }))
    }

    function onSave(ev) {
        ev.preventDefault()
        updateUserPrefs(prefsToEdit)
            .then(() => {
                showSuccessMsg(`Prefs updated successfully`)
                addActivity({ txt: `Updated user prefs`, at: Date.now() })
            })
            .catch(err => {
                showErrorMsg('Cannot update prefs')
            })
    }

    function getTimeAgo(timestamp) {
        const currentDate = new Date();
        const previousDate = new Date(timestamp);
        const timeDifference = currentDate - previousDate;
        const minutes = Math.floor(timeDifference / 60000);
        const hours = Math.floor(minutes / 60);

        if (minutes < 1) {
            return 'Just now';
        } else if (minutes < 60) {
            return minutes + ' minutes ago';
        } else if (hours < 24) {
            return hours + ' hours ago';
        } else {
            return 'Long time ago';
        }
    }

    if (!user) return

    return (
        <section className="user-profile-container">
            <div className="user-profile">
                <h1> My Profile </h1>
                <h2> My Preferences </h2>
                <form onSubmit={onSave}>
                    <input onChange={handleChange} type="text" name="fullname" id="fullname" placeholder="Your name" value={prefsToEdit.fullname} />

                    <label htmlFor="color"> Color </label>
                    <input onChange={handleChange} type="color" name="color" id="color" value={prefsToEdit.color} />

                    <label htmlFor="bg-color"> BG Color </label>
                    <input onChange={handleChange} type="color" name="bg-color" id="bg-color" value={prefsToEdit['bg-color']} />

                    <button> Save </button>
                </form>
            </div>
            <div className="user-activities">
                <h2> My Activities </h2>
                <ul>
                    {user.activities.map(activity =>
                        <li key={activity._id} className="activity-preview flex align-center">
                            <span className="time-ago"> {`${getTimeAgo(activity.at)}`} </span>
                            <p> {`${activity.txt}`} </p>
                        </li>
                    )}
                </ul>
            </div>
        </section>
    )
}