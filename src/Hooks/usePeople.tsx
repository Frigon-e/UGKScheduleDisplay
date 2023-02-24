import { useState } from "react";

export type Person = {
  name: string;
  start: Date;
  end: Date;
  position: string;
  timeSeries: boolean[];
}

export default function usePeople() {
  const [people, setPeople] = useState<Person[]>([])

  const addPerson = (name: string, start: Date, end: Date, position: string) => {
    const timeOffset = (5 * 2) + 1;
    const timeSeries = Array(32).fill(false)
    const new_start =  (start.getHours() * 2 + (start.getMinutes() / 30)) - timeOffset
    const new_end =  (end.getHours() * 2 + (end.getMinutes() / 30)) - timeOffset
    for (let j = new_start; j < new_end; j++) {
      timeSeries[j] = true
    }
    setPeople([...people, { name, start, end, position, timeSeries}])
  }

  const removePerson = (name: string) => {
    setPeople(people.filter(person => person.name !== name))
  }


return { people, addPerson, removePerson }
}

