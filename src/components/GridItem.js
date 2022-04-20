import '../styles/GridItem.css';

const render_button = (id, column_name, button_text, task_function) => {
  if (button_text && task_function) {
    return (
      <div>
        <a
          href="#"
          className="btn btn-primary"
          role="button"
          onClick={clickButton(id, column_name, task_function)}
        >
          {button_text}
        </a>
      </div>
    );
  } else {
    return <div />;
  }
};

const clickButton = (id, column_name, task_function) => {
  return () => {
    task_function(id, column_name);
  };
};

const GridItem = (props) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">ID: {props.id}</h6>
        <h6 className="card-subtitle mb-2 text-muted">Type: {props.type}</h6>
        <div className="btn-cont">
          <div className='back'>
            {render_button(props.id, props.column, props.previous, props.back)}
          </div>
          <div className='forward'>
            {render_button(props.id, props.column, props.forward, props.next)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
