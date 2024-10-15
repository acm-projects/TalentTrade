import './FAQ.css'
import NavBarPre from '../components/NavBarPre/NavBar'
import NavBarPost from '../components/NavBarPost/NavBar'
import Accordion from '../components/AccordionFAQ/Accordion'

const FAQ = () => {
    return (
        <div>
            <div className="background"><img src={"/images/faqBackground.svg"} class="background-img" /></div>
            <NavBarPre />
                <div className="page-header-centered">
                    <div className="title">Frequently Asked Questions</div>
                </div>
                <Accordion />
        </div>
    )
}

export default FAQ