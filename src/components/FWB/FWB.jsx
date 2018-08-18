import React, { Component } from 'react'
import Button from 'cozy-ui/react/Button'
import Input from 'cozy-ui/react/Input'
import Label from 'cozy-ui/react/Label'
import Icon from 'cozy-ui/react/Icon'

class FWB extends Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      totalCash: '',
      personName: '',
      personCash: '',
      personMore: [],
      personLess: [],
      cashEventTC: [],
      cashEventHTH: []
    }
  }
  handleChangeTotal(event) {
    if (/^[0-9]*$/.test(event.target.value)) {
      this.setState({
        totalCash: event.target.value
      })
    } else {
      this.setState({
        totalCash: this.state.totalCash
      })
    }
  }
  handleChangeName(event) {
    this.setState({
      personName: event.target.value
    })
  }
  handleChangeCash(event) {
    if (/^[0-9]*$/.test(event.target.value)) {
      this.setState({
        personCash: event.target.value
      })
    } else {
      this.setState({
        personCash: this.state.personCash
      })
    }
  }
  addPerson() {
    let person = this.state.persons
    person.push({
      name: this.state.personName,
      cash: this.state.personCash,
      difference: 0
    })
    this.setState({
      persons: person,
      personName: '',
      personCash: ''
    })
  }
  removePerson(event) {
    window.console.log(event.target)
    let index = parseInt(event.target.dataset.index, 10)
    let persons = this.state.persons
    if (index > -1) {
      persons.splice(index, 1)
    }
    this.setState({
      persons: persons
    })
  }
  compare(a, b) {
    if (a.cash < b.cash) return -1
    if (a.cash > b.cash) return 1
    return 0
  }
  countCash() {
    if (this.state.totalCash !== '') {
      let middleValue = this.state.totalCash / this.state.persons.length
      let persons = this.state.persons
      let personMore = []
      let personLess = []
      persons.forEach(el => {
        el.difference = el.cash - middleValue
        if (el.cash > middleValue) {
          personMore.push(el)
        } else {
          personLess.push(el)
        }
      })
      this.setState({
        persons: persons
      })
      personLess.sort(this.compare)
      personMore.sort(this.compare)
      this.setState({
        personLess: personLess,
        personMore: personMore
      })
      this.cashEvent()
    }
  }
  cashEvent() {
    let eventTC = []
    let eventHTH = []
    let personLess = this.state.personLess
    let personMore = this.state.personMore
    let eventPerson = [...this.state.personLess, ...this.state.personMore]
    eventPerson.forEach(el => {
      eventTC.push({
        name: el.name,
        cash: Math.abs(el.difference),
        action:
          el.difference > 0
            ? 'must take from total cash'
            : 'must give to total cash'
      })
    })
    this.setState({
      cashEventTC: eventTC
    })
    personMore.forEach(el => {
      for (let i = 0; el.difference > 0; i++) {
        let perLess = personLess[i]
        if (Math.abs(perLess.difference) > 0) {
          let toGive =
            el.difference > Math.abs(perLess.difference)
              ? Math.abs(perLess.difference)
              : el.difference
          eventHTH.push({
            from: perLess.name,
            to: el.name,
            cash: toGive
          })
          el.difference = el.difference - toGive
          perLess.difference = perLess.difference + toGive
        }
      }
    })
    this.setState({
      cashEventHTH: eventHTH
    })
  }

  render() {
    return (
      <div className="main-wrapper-fwb">
        <div style={{ 'margin-bottom': '10px' }}>
          <Label htmlFor="totalAmount">Total amount</Label>
          <Input
            s={6}
            id="totalAmount"
            onChange={this.handleChangeTotal.bind(this)}
            value={this.state.totalCash}
            validate
            placeholder="Enter Total amount"
          />
        </div>
        <div className="new_person">
          <div className="new_person_div">
            <Label s={3} htmlFor="personName">
              Person Name
            </Label>
            <Input
              s={3}
              id="personName"
              value={this.state.personName}
              onChange={this.handleChangeName.bind(this)}
              validate
              placeholder="Enter Person Name"
            />
          </div>
          <div className="new_person_div">
            <Label s={3} htmlFor="cashGiven">
              Amount of cash
            </Label>
            <Input
              s={3}
              id="cashGiven"
              onChange={this.handleChangeCash.bind(this)}
              value={this.state.personCash}
              validate
              placeholder="Enter the amount of cash"
            />
          </div>
          <div className="new_person_div">
            <Button
              s={3}
              theme="highlight"
              style={{ 'margin-bottom': '20px' }}
              onClick={this.addPerson.bind(this)}
              icon={<Icon icon="plus" color="white" />}
              label="Add Person"
            />
          </div>
        </div>
        <hr />
        <div className="persons">
          <p>Click to remove from list .</p>
          {this.state.persons.map((val, index) => {
            return (
              <div
                className="person_item"
                key={`person_list_item${index}`}
                onClick={this.removePerson.bind(this)}
              >
                <p data-index={index}>
                  <strong data-index={index}>
                    {val.name} - {val.cash}
                  </strong>
                </p>
              </div>
            )
          })}
        </div>
        <hr />
        <Button
          s={3}
          theme="highlight"
          onClick={this.countCash.bind(this)}
          icon={<Icon icon="exchange" color="white" />}
          label="Count"
        />
        <div className="results">
          <div id="cashEventTC" className="result_field">
            {this.state.cashEventTC.map((val, index) => {
              return (
                <div
                  className="person_cashEventTC"
                  key={`person_cashEventTC_item${index}`}
                >
                  <p data-index={index}>
                    <strong data-index={index}>
                      {val.name} {val.action} {val.cash}
                    </strong>
                  </p>
                </div>
              )
            })}
          </div>
          <div id="cashEventHTH" className="result_field">
            {this.state.cashEventHTH.map((val, index) => {
              return (
                <div
                  className="person_cashEventHTH"
                  key={`person_cashEventHTH_item${index}`}
                >
                  <p data-index={index}>
                    <strong data-index={index}>
                      {val.from} must give {val.cash} to {val.to}
                    </strong>
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default FWB
