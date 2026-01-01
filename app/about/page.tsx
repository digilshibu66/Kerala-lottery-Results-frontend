export default function AboutPage() {
    return (
        <div className="container max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">About Us</h1>
            <div className="prose dark:prose-invert">
                <p>
                    Welcome to the Kerala Lottery Result Checker. We are dedicated to providing the fastest and most accurate lottery results for the people of Kerala.
                </p>
                <p className="mt-4">
                    Our system automatically fetches results from official sources as soon as they are published. We strive to present this data in an easy-to-use format, accessible from any device.
                </p>
                <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
                <p>
                    Please note that we are an informational service only. We are not affiliated with the Kerala State Lotteries Department or the Government of Kerala. While we make every effort to ensure accuracy, please verify your results with official sources (Kerala Government Gazette).
                </p>
            </div>
        </div>
    );
}
