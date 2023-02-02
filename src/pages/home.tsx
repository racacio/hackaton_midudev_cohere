import { Typography } from "@material-tailwind/react";
import { Footer } from '@/common/components/footer';
import { CardRequestAI } from "@/components/card-request-AI";
import { CardResponseAI } from "@/components/card-response-AI";
import { useCardRequest } from "@/hooks/useCardRequest";

const linkCohere: any = (
    <>
        Visit to{" "}
        <a
            href="https://cohere.ai"
            target="_blank"
            className="text-write-gray-500 underline transition-colors hover:text-blue-500"
        >
            COHERE
        </a>
    </>
)

export const Home = () => {
    const { cardRequest, validInput, setTypeAI, setResponseGenerateAI, setResponseClassifyAI } = useCardRequest();

    return (
        <>
            <div className="relative block h-[60vh] pt-28">
                <div className="bg-profile-background absolute top-0 h-full w-full bg-[url('/img/background-1.jpeg')] bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
                <div className="max-w-8xl container relative mx-auto">
                    <div className="flex flex-wrap items-center">
                        <div className="ml-auto mr-auto w-full px-4 text-center lg:w-10/12">
                            <Typography variant="h1" color="white" className="mb-6 font-black">
                                What is Cohere?
                            </Typography>
                            <Typography variant="lead" color="white" className="opacity-80">
                                Cohere allows you to implement natural language processing (NLP) into your product. Get started and explore Cohere’s capabilities with the Playground (no code) or Quickstart Tutorials (with code). {linkCohere}
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <section className="-mt-52 bg-gray-50 px-4 pb-20 pt-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
                        <CardRequestAI isValidInput={cardRequest.inputValid} validInput={validInput} setTypeAI={setTypeAI} setResponseGenerateAI={setResponseGenerateAI} setResponseClassifyAI={setResponseClassifyAI} />
                        <CardResponseAI typeAI={cardRequest.typeAI} responseGenerateAI={cardRequest.responseGenerateAI} responseClassifyAI={cardRequest.responseClassifyAI} />
                    </div>
                </div>
            </section>
            <div className="bg-blue-gray-50/50">
                <Footer />
            </div>
        </>
    )
}
