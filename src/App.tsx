import './index.css'
import usePeople, { Person } from './Hooks/usePeople'
import { v4 as uuid } from "uuid";
import clsx from 'clsx';

type formProps = {
  addPerson: (name: string, start: Date, end: Date, position: string) => void
}

function PersonForm(prop: formProps) {
  const { addPerson } = prop
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const name = form.get('first-name') as string
    const position = form.get('position') as string
    const startHours = Number(form.get('start-hours') as string)
    const startMinutes = Number(form.get('start-minutes') as string)
    const startAMPM = form.get('start-ampm') as string
    const endHours = Number(form.get('end-hours') as string)
    const endMinutes = Number(form.get('end-minutes') as string)
    const endAMPM = form.get('end-ampm') as string

    const error_output = document.getElementById("error-box");



    const now = new Date()
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDay(), startAMPM === "pm" ? startHours + 12 : startHours, startMinutes, 0, 0)
    const end = new Date(now.getFullYear(), now.getMonth(), now.getDay(), endAMPM === "pm" ? endHours + 12 : endHours, endMinutes, 0, 0)

    if (error_output !== null) {
      error_output.textContent = ''
      if (name === "") {
        error_output.textContent = 'Enter a name'
        return
      }
      if (start > end) {
        error_output.textContent = 'Start time must be before end time';
        return
      }
      if (start.getHours() > 21 || (start.getHours() < 5) || (start.getHours() == 5 && start.getMinutes() === 0)) {
        error_output.textContent = 'Start time must be between 5:30am and 9pm';
        return
      }
      if (end.getHours() > 21 || (end.getHours() < 5) || (end.getHours() == 5 && end.getMinutes() === 0)) {
        error_output.textContent = 'End time must be between 5:30am and 9pm';
        return
      }

    }

    addPerson(name, start, end, position)
  }


  return (
    <div className="relative isolate py-6 px-6 sm:py-8 lg:px-8">
      <div className="flex flex-col gap-16 sm:gap-y-20 lg:flex-row">
        <form onSubmit={handleSubmit} className="lg:flex-auto">
          <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-white">
                First name
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full rounded-md bg-zinc-900 border-0 py-2 px-3.5 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                />

              </div>
            </div>
            <div>
              <label htmlFor="position" className="block text-sm font-semibold leading-6 text-white">
                Position
              </label>
              <div className="mt-2.5">
                <select
                  name="position"
                  id="position"
                  autoComplete="position-title"
                  className="block w-full rounded-md bg-zinc-900 border-0 py-2 px-3.5 text-sm leading-6 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option key={uuid()}>Supervisor</option>
                  <option key={uuid()}>HeadGuard</option>
                  <option key={uuid()}>Lifeguard</option>
                </select>

              </div>
            </div>
            <div>
              <label htmlFor="start-time" className="block text-sm font-semibold leading-6 text-white">
                Start
              </label>
              <div className="mt-2.5 leading-6 text-white text-sm">
                <select
                  name="start-hours"
                  id="start-hours"
                  className="rounded-md bg-zinc-900 border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option key={uuid()} value="1">1</option>
                  <option key={uuid()} value="2">2</option>
                  <option key={uuid()} value="3">3</option>
                  <option key={uuid()} value="4">4</option>
                  <option key={uuid()} value="5">5</option>
                  <option key={uuid()} value="6">6</option>
                  <option key={uuid()} value="7">7</option>
                  <option key={uuid()} value="8">8</option>
                  <option key={uuid()} value="9">9</option>
                  <option key={uuid()} value="10">10</option>
                  <option key={uuid()} value="11">10</option>
                  <option key={uuid()} value="12">12</option>
                </select>
                <span className="text-xl mx-2">:</span>
                <select
                  name="start-minutes"
                  id="start-minutes"
                  className="rounded-md bg-zinc-900 border-0 py-2 mr-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option key={uuid()} value="0">00</option>
                  <option key={uuid()} value="30">30</option>
                </select>
                <select
                  name="start-ampm"
                  id="start-ampm"
                  className="rounded-md bg-zinc-900 border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option key={uuid()} value="am">AM</option>
                  <option key={uuid()} value="pm">PM</option>
                </select>
              </div>

            </div>
            <div>
              <label htmlFor="end-time" className="block text-sm font-semibold leading-6 text-white">
                End Time

              </label>
              <div className="mt-2.5 leading-6 text-white text-sm">
                <select
                  name="end-hours"
                  id="end-hours"
                  className="rounded-md bg-zinc-900 border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option key={uuid()} value="1">1</option>
                  <option key={uuid()} value="2">2</option>
                  <option key={uuid()} value="3">3</option>
                  <option key={uuid()} value="4">4</option>
                  <option key={uuid()} value="5">5</option>
                  <option key={uuid()} value="6">6</option>
                  <option key={uuid()} value="7">7</option>
                  <option key={uuid()} value="8">8</option>
                  <option key={uuid()} value="9">9</option>
                  <option key={uuid()} value="10">10</option>
                  <option key={uuid()} value="11">10</option>
                  <option key={uuid()} value="12">12</option>
                </select>
                <span className="text-xl mx-2">:</span>
                <select
                  name="end-minutes"
                  id="end-minutes"
                  className="rounded-md bg-zinc-900 border-0 py-2 mr-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option key={uuid()} value="0">00</option>
                  <option key={uuid()} value="30">30</option>
                </select>
                <select
                  name="end-ampm"
                  id="end-ampm"
                  className="rounded-md bg-zinc-900 border-0 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option key={uuid()} value="am">AM</option>
                  <option key={uuid()} value="pm">PM</option>
                </select>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Person
            </button>
          </div>
          <div className="mt-5">
            <p className="text-sm text-red-400 text-center" id="error-box"></p>
          </div>
        </form>
      </div>
    </div>
  )
}



function App() {

  /* @todo: make a grid of divs with a class of 'box' and a class of 'box-1' to 'box-9' 
  Use divs then combine and color them with css */

  /* I want to make a varible hight array depending on the amount of inputs from the user
*  I want the bottom row of the array to always be reserved for time broken into 30min spaces
*  Then the left side to be reserved for names of the people
*  Then the rest of the array to be reserved for the color of the box
*  I want to make a function that takes the start and end time and the position of the person and then fills in the array with the correct color
*  The time between 5:30am to 9:30pm will be the only time that is allowed which is 32 boxes
*  */

  const { people, addPerson, removePerson } = usePeople();


  return (
    <div className="bg-zinc-800 text-white h-screen">
      <div className="container mx-auto sm:px-6 lg:px-8">
        <PersonForm addPerson={addPerson} />
        <div className={"grid gap-y-2 space-x-0 grid-cols-34 grid-rows-" + (people.length + 1)}>
          {people.map((person: Person) => (
            <>
              <div className="text-xs text-white text-center my-auto col-span-2" onClick={() => (removePerson(person.name))}>{person.name}</div>
              {person.timeSeries.map((time: boolean) => (
                <div className={"h-9 border-l-2 border-l-white-200 " + clsx(
                  time ?
                    person.position === "HeadGuard" ?
                      "bg-cyan-500" :
                      "bg-red-400"
                    : "bg-zinc-900",
                )}></div>
              ))}
            </>
          ))}
          <div className="text-xs text-white text-center my-auto col-span-2">Time</div>
          {Array(16).fill(0).map((_, x) =>
            <>
              <div className="text-xs text-white text-center my-auto col-span-2">{(x + 5) % 12 + 1}:00</div>
            </>
          )}

        </div>
      </div>
    </div>
  )
}

export default App
