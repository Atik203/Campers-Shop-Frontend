import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import MapEmbed from "./MapEmbed";

export default function ContactSection() {
  return (
    <div className="pt-8 sm:pt-20 mt-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-8 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Contact Us
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                Whether you have questions, need assistance, or want to share
                feedback, we're here to help. Reach out to us via the contact
                details below.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Collaborate
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-primary"
                        href="mailto:collaborate@campershop.com"
                      >
                        collaborate@campershop.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 123-4567</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Press Inquiries
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-primary"
                        href="mailto:press@campershop.com"
                      >
                        press@campershop.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 234-5678</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Careers
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-primary"
                        href="mailto:careers@campershop.com"
                      >
                        careers@campershop.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 345-6789</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 p-6">
                <h3 className="text-base font-semibold leading-7 text-gray-900">
                  Support
                </h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-primary"
                        href="mailto:hello@campershop.com"
                      >
                        support@campershop.com
                      </a>
                    </dd>
                  </div>
                  <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 456-7890</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-6 py-6">
            <h2 className="text-2xl font-semibold leading-7 text-gray-900">
              Follow Us
            </h2>
            <div className="flex justify-center space-x-6 py-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-600"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-600 hover:text-pink-800"
              >
                <FaInstagram size={30} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={30} />
              </a>
            </div>
            <div className="text-center mt-8">
              <p className="text-lg font-semibold text-gray-900">
                Contact Info
              </p>
              <p className="text-gray-600">Phone: +1 (555) 789-0123</p>
              <p className="text-gray-600">Email: contact@campershop.com</p>
              <p className="text-gray-600">
                Address: 123 Camping Road, Adventure City, CA 90001
              </p>
            </div>
          </div>
          <div className="px-4 mx-auto">
            <div className="my-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our Location
              </h2>
              <p className="mt-4 leading-7 text-gray-600">
                Find us at our store location using the map below:
              </p>
            </div>
            <MapEmbed />
          </div>
        </div>
      </div>
    </div>
  );
}
