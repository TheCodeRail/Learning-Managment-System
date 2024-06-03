import React from "react";

const OurMoto = () => {
  return (
    <>
      <section class="bg-white dark:bg-gray-900" id="about">
        <div class="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div class="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
              How we are different?
            </h2>
            <p class="mb-4 font-normal text-black">
              At our core, we're not just another full stack course - we're a
              transformative learning experience. 🌟What sets us apart? It's
              simple: we're here to guide you from beginner to full stack pro
              without breaking the bank. 💰 With small class sizes, you're not
              just a face in the crowd—you're a valued member of our coding
              family. 💻
            </p>
            <p className="font-normal text-black">
              But that's not all. We believe in hands-on, practical learning
              that goes beyond the basics. 🚀 From personalized attention to
              real-world projects, we're here to equip you with the skills and
              confidence to thrive in the ever-evolving world of full stack
              development. 💡 So, if you're ready to break free from
              cookie-cutter courses and embark on a journey of growth,
              creativity, and genuine connection, you're in the right place. 🌈
              Let's redefine what it means to learn full stack development
              together. 🚀💻
            </p>
          </div>
          <div class="grid grid-cols-2 gap-4 mt-8">
            <img
              class="w-full rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
              alt="office content 1"
            />
            <img
              class="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default OurMoto;
