function FeedbackPage() {
    return (
        <ul>
            {props.feedbackItems.map((item) => (
            <li key={item.id} >{item.text}</li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {

}

export default FeedbackPage;