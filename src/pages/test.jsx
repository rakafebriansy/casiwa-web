import InputFile from "../components/Elements/InputFile";
import InputText from "../components/Elements/InputText";
import InputTextarea from "../components/Elements/InputTextarea";

const TestPage = () => {
    return (
        <div className="flex items-center min-h-screen justify-center">
            <div className="w-[80%] h-[80%] bg-backgroundPrime">
                <div className="">
                    <InputText/>
                    <InputTextarea/>
                    <InputFile/>
                </div>
            </div>
        </div>
    );
};

export default TestPage;