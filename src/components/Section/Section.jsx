import PropTypes from 'prop-types';
import { Heading, SectionWrap } from './Section.styled';

const Section = ({ title, children }) => (
  <SectionWrap>
    <Heading>{title}</Heading>
    {children}
  </SectionWrap>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default Section;