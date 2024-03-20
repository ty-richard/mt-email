import React from 'react';
// import MotortrendNewsletterEmailTemplate from '../../emails/index';

export default async function DashboardPage(): Promise<React.ReactNode> {

    return (
        <section className="container grid h-full items-center gap-6 pb-8 pt-6 md:py-10">
            <div className="flex flex-col h-full max-w-[980px] items-center justify-center mx-auto">
                <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl mb-5">
                    You are now logged in!
                </h1>
                {/* <div className="flex flex-col items-center justify-center">
                    <MotortrendNewsletterEmailTemplate 
                        name="Ty Richard" 
                        headline="Test" 
                        imageUrls={["https://www.motortrend.com/uploads/2024/02/wayfarer-van-conversions-ford-transit-trail-wilford-3.jpg"]} 
                    />
                </div> */}
            </div>
        </section>
    );
};
