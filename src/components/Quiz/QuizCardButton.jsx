import "../../styles/QuizCardButton.css";

const QuizCardButton = ({ onButtonClick, name, id, color }) => {
    return (
        <button
            className="quiz-button"
            style={{ background: color }}
            onClick={() => onButtonClick(name, id)}
        >
            {name}
        </button>
    );
};

export default QuizCardButton;
