import React, { Component, FormEvent } from 'react'
import ReactDOM from 'react-dom'

type Task = {
  title: string
  content: string
}

type Tasks = Task[]

type TodoItemProps = {
  id: string
  task: Task
  onDelete: any
}

class TodoItem extends Component<TodoItemProps> {
  render () {
    return (
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">
            {this.props.task.title}
          </p>
          <div className="card-header-icon" onClick={() => this.props.onDelete(this.props.id)}>
            <button className="delete"></button>
          </div>
        </div>
        {this.props.task.content.length > 0
          ? <div className="card-content todo-content">{this.props.task.content}</div>
          :  undefined
        }
      </div>
    )
  }
}

type TodoListProps = {
  tasks: Tasks
  onDelete: any
}

class TodoList extends Component<TodoListProps> {
  render () {
    const todos = this.props.tasks.map((todo, index) => {
      return <TodoItem task={todo} key={index} id={String(index)} onDelete={this.props.onDelete}/>
    })

    return (
      <div className="card-content overflow-auto">
        <div className="list-wrapper">
          {todos.length > 0
            ? todos 
            : <p>You have nothing on your Todo list!</p>
          }
        </div>
      </div>
    )
  }
}

type HeaderProps = {
  numTodos: number 
}

class Header extends Component<HeaderProps> {
  render () {
    return (
      <div className='card-header'>
        <h3 className='card-header-title is-size-3'>
          You have {this.props.numTodos || 'no'} Todos
        </h3>
      </div>
    )
  }
}

type SubmitFormState = {
  task: Task
}

class SubmitForm extends Component<any, SubmitFormState> {
  constructor (props: any) {
    super(props)

    this.state = {
      task: {
        title: '',
        content: '',
      }
    }
  }

  // Arrow function, getting correct "this".
  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (this.state.task.title === '') {
      return
    }

    this.props.onFormSubmit(this.state.task)

    this.setState({
      task: {
        title: '',
        content: '',
      }
    })
  }

  render () {
    return (
      <div className="card-footer">
        <div className="card-footer-item">
        <form className="form is-fullwidth" onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                placeholder="Enter todo content..."
                value={this.state.task.content}
                onChange={(e) => this.setState({ task: { ...this.state.task, content: e.target.value } })}
              />
            </div>
          </div>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input
                className="input"
                type="text"
                placeholder="Enter todo title..."
                required
                value={this.state.task.title}
                onChange={(e) => this.setState({ task: { ...this.state.task, title: e.target.value } })}
              />
            </div>
            <div className="control">
              <button className="button is-info" type="submit">Add</button>
            </div>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

type AppState = {
  tasks: Tasks
}

class App extends Component<any, AppState> {
  constructor (props: any) {
    super(props)

    this.state = {
      tasks: []
    }
  }

  // Arrow function, getting correct "this".
  handleSubmit = (task: Task) => {
    this.setState({
      tasks: [...this.state.tasks, task]
    })
  }

  // Arrow function, getting correct "this".
  handleDeleteClick = (i: number) => {
    const tasks = [...this.state.tasks]

    tasks.splice(i, 1)

    this.setState({ tasks })
  }

  render () {
    return (
      <section className="section">
        <div className="container">
          <div className="card">
            <Header numTodos={this.state.tasks.length} />
            <TodoList tasks={this.state.tasks} onDelete={this.handleDeleteClick}/>
            <SubmitForm onFormSubmit={this.handleSubmit} />
          </div>
        </div>
      </section>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
