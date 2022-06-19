import styled from 'styled-components'

const SpinnerButton = () => {
    return (
        <Spinner></Spinner>
    )
}

const Spinner = styled.div`
    margin: 0 auto;
    border: 2px solid white;
    border-left-color: transparent;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    animation: spin 0.5s linear infinite;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
    
      100% {
        transform: rotate(360deg);
      }
    }
`

export default SpinnerButton