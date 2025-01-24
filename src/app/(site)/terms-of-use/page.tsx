import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import LOGO from "../../../images/logoFull.svg";

// Styles
import "./terms-of-use.scss";

import Footer from "@/components/Footer";

export const metadata = {
  title: "Journeylog | Terms of Use",
  description:
    "Track your habits, goals, and daily routines effortlessly. Stay consistent, gain insights, and get reminders to keep you on track. Start your journey today!",
};

const Purpose = () => {
  return (
    <div className="p-6 flex flex-col w-[100svw] h-[100svh] bg-[#171717]">
      <header className="flex w-[850px] rounded-2xl m-auto justify-between max-w-[95%] mt-8 bg-[#1E1E1E] border-1 border-[#303030] py-4 px-2 md:px-2 mb-20">
        <Image
          src={LOGO}
          width={150}
          alt="Logo"
          className="md:ml-4 ml-2 w-[130px] md:w-[150px]"
        />
        <ul className="flex">
        <li className="flex items-center mx-3">
            <Link
              className="flex items-center text-[14px] md:text-[16px]"
              href="/"
            >
              <ChevronLeft />
              Back to home
            </Link>
          </li>
        </ul>
      </header>
      <div className="w-full max-w-[100%] flex-col auth flex items-center justify-center">
        <div className="w-[800px] max-w-[95%] text-center mt-5 md:mt-0">
          <h1 className="md:text-[35px] text-[30px] leading-[40px] font-bold mb-5 md:mb-5 text-[white]">
            Terms of Use
          </h1>
          <span data-custom-className="subtitle" className="text-[#909090]">
            Last updated <strong className="question">January 02, 2025</strong>
          </span>
          <br />

          <div
            data-custom-className="body"
            className="text-[16px] md:text-[20px] text-justify leading-[25px] md:leading-[35px] mb-7 text-[#909090]"
          >
            <div>
              <div className="MsoNormal">
                <br />
              </div>
              <div>
                <br />
              </div>
              <div>
                <strong>
                  <span data-custom-className="heading_1">
                    <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
                  </span>
                </strong>
              </div>
            </div>
            <div>
              <div className="MsoNormal" id="agreement">
                <a data-name="_6aa3gkhykvst"></a>
              </div>
            </div>
            <div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  We are{" "}
                  <strong
                    className="block-container question question-in-editor"
                    data-id="9d459c4e-c548-e5cb-7729-a118548965d2"
                    data-type="question"
                  >
                    Journeylog
                  </strong>
                  <strong className="block-component"></strong> (
                  <strong className="block-component"></strong>"
                  <strong>Company</strong>," "<strong>we</strong>," "
                  <strong>us</strong>," "<strong>our</strong>"
                  <strong className="statement-end-if-in-editor"></strong>)
                  <span>
                    <span>
                      <span>
                        <strong className="question">
                          <strong className="block-component"></strong>
                        </strong>
                        <span>
                          <strong className="block-component"></strong>
                        </span>
                        , a company registered in
                        <strong className="block-component"></strong>
                        <strong className="block-component"></strong>{" "}
                        <span>
                          <span>
                            <strong className="question">Brazil</strong>
                            <strong className="statement-end-if-in-editor">
                              <span>
                                <span>
                                  <strong className="statement-end-if-in-editor"></strong>
                                </span>
                              </span>
                            </strong>
                          </span>
                        </span>{" "}
                        at
                        <strong className="question">
                          R. Tapari - Vila Esperança, São Paulo - SP, 03651-060,
                          Brazil
                        </strong>
                        <strong className="block-component"></strong>
                      </span>
                    </span>
                    , <strong className="question">03651060</strong>
                  </span>
                </span>
                <span>
                  <span data-custom-className="body_text">
                    <span>
                      <span data-custom-className="body_text">
                        <span>
                          <strong className="block-component"></strong>,{" "}
                          <strong className="question">São Paulo</strong>
                          <strong className="statement-end-if-in-editor"></strong>
                          <strong className="block-component"></strong>{" "}
                          <strong className="question">03651-060</strong>
                          <strong className="statement-end-if-in-editor"></strong>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span>
                  <span>
                    <strong className="else-block"></strong>
                  </span>
                </span>
                <strong className="statement-end-if-in-editor">.</strong>
                <strong className="block-component"></strong>
              </div>
            </div>
            <div>
              <br />
            </div>
            <div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  We operate <strong className="block-component"></strong>the
                  website{" "}
                  <span>
                    <strong className="question">
                      <a
                        href="https://journeylog.app"
                        target="_blank"
                        data-custom-className="link"
                      >
                        https://journeylog.app
                      </a>
                    </strong>
                  </span>{" "}
                  (the <strong className="block-component"></strong>"
                  <strong>Site</strong>"
                  <strong className="statement-end-if-in-editor"></strong>)
                  <strong className="block-component"></strong>
                  <strong className="block-component"></strong>, as well as any
                  other related products and services that refer or link to
                  these legal terms (the{" "}
                  <strong className="block-component"></strong>"
                  <strong>Legal Terms</strong>"
                  <strong className="statement-end-if-in-editor"></strong>)
                  (collectively, the{" "}
                  <strong className="block-component"></strong>"
                  <strong>Services</strong>"
                  <strong className="statement-end-if-in-editor"></strong>).{" "}
                  <strong className="block-component"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <strong className="question">
                  Track your habits, goals, and daily routines effortlessly.
                  Stay consistent, gain insights, and get reminders to keep you
                  on track. Start your journey today.
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  You can contact us by{" "}
                  <strong className="block-component"></strong>phone at{" "}
                  <strong className="question">(+55)11955573567</strong>, email
                  at
                  <strong className="question">contact@cesarolvr.com</strong>
                  <strong className="block-component"></strong>,
                  <strong className="statement-end-if-in-editor"></strong> or by
                  mail to{" "}
                  <strong className="question">
                    R. Tapari - Vila Esperança, São Paulo - SP, 03651-060,
                    Brazil
                  </strong>
                  <strong className="block-component"></strong>,{" "}
                  <strong className="question">03651060</strong>
                  <strong className="block-component"></strong>,{" "}
                  <strong className="question">São Paulo</strong>
                  <strong className="statement-end-if-in-editor"></strong>
                  <strong className="block-component"></strong>{" "}
                  <strong className="question">03651-060</strong>
                  <strong className="statement-end-if-in-editor"></strong>
                  <strong className="block-component">
                    <strong className="block-component">,&nbsp;</strong>
                    <strong className="question">Brazil</strong>
                    <strong className="statement-end-if-in-editor"></strong>
                  </strong>
                  .
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  These Legal Terms constitute a legally binding agreement made
                  between you, whether personally or on behalf of an entity (
                  <strong className="block-component"></strong>"
                  <strong>you</strong>"
                  <strong className="statement-end-if-in-editor"></strong>), and{" "}
                  <strong className="question">Journeylog</strong>, concerning
                  your access to and use of the Services. You agree that by
                  accessing the Services, you have read, understood, and agreed
                  to be bound by all of these Legal Terms. IF YOU DO NOT AGREE
                  WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY
                  PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE
                  USE IMMEDIATELY.<strong className="block-component"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  Supplemental terms and conditions or documents that may be
                  posted on the Services from time to time are hereby expressly
                  incorporated herein by reference. We reserve the right, in our
                  sole discretion, to make changes or modifications to these
                  Legal Terms <strong className="block-component"></strong>from
                  time to time<strong className="else-block"></strong>. We will
                  alert you about any changes by updating the{" "}
                  <strong className="block-component"></strong>"Last updated"
                  <strong className="statement-end-if-in-editor"></strong> date
                  of these Legal Terms, and you waive any right to receive
                  specific notice of each such change. It is your responsibility
                  to periodically review these Legal Terms to stay informed of
                  updates. You will be subject to, and will be deemed to have
                  been made aware of and to have accepted, the changes in any
                  revised Legal Terms by your continued use of the Services
                  after the date such revised Legal Terms are posted.
                  <strong className="else-block"></strong>
                </span>
              </div>
            </div>
            <div>
              <br />
            </div>
            <div>
              <div className="MsoNormal" data-custom-className="body_text">
                <strong
                  className="block-container if"
                  data-type="if"
                  id="a2595956-7028-dbe5-123e-d3d3a93ed076"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <span>
                        <strong className="block-component"></strong>The
                        Services are intended for users who are at least 18
                        years old. Persons under the age of 18 are not permitted
                        to use or register for the Services.
                      </span>
                    </strong>
                  </strong>
                  <strong data-type="conditional-block">
                    <strong className="block-component"></strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                We recommend that you print a copy of these Legal Terms for your
                records.
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="heading_1">
                <strong>
                  <h2>TABLE OF CONTENTS</h2>
                </strong>
              </div>
              <div className="MsoNormal">
                <a href="#services">
                  <span data-custom-className="link">
                    <span>
                      <span data-custom-className="body_text">
                        1. OUR SERVICES
                      </span>
                    </span>
                  </span>
                </a>
              </div>
              <div className="MsoNormal">
                <a data-custom-className="link" href="#ip">
                  <span>
                    <span data-custom-className="body_text">
                      2. INTELLECTUAL PROPERTY RIGHTS
                    </span>
                  </span>
                </a>
              </div>
              <div className="MsoNormal">
                <a data-custom-className="link" href="#userreps"></a>
                <a data-custom-className="link" href="#userreps">
                  <span>
                    <span data-custom-className="body_text">
                      3. USER REPRESENTATIONS
                    </span>
                  </span>
                </a>
              </div>
              <div className="MsoNormal">
                <span>
                  <span data-custom-className="body_text">
                    <strong className="block-component"></strong>
                  </span>
                </span>
                <a data-custom-className="link" href="#userreg">
                  <span>
                    <span data-custom-className="body_text">
                      4. USER REGISTRATION
                    </span>
                  </span>
                </a>
                <span>
                  <span data-custom-className="body_text">
                    <strong className="statement-end-if-in-editor"></strong>
                  </span>
                </span>{" "}
                <a data-custom-className="link" href="#products"></a>
              </div>
              <div className="MsoNormal">
                <a data-custom-className="link" href="#products">
                  <span>
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#purchases"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#purchases">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>5. PURCHASES
                      AND PAYMENT
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </span>
                </a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong className="block-component">
                  <span data-style="font-size: 15px;"></span>
                </strong>
                <a data-custom-className="link" href="#subscriptions">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      6. SUBSCRIPTIONS
                    </span>
                  </span>
                </a>
                <strong className="statement-end-if-in-editor">
                  <span data-style="font-size: 15px;"></span>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <span data-style="font-size: 15px;">
                  <span data-custom-className="body_text">
                    <strong className="block-component"></strong>
                  </span>
                </span>{" "}
                <a data-custom-className="link" href="#software"></a>{" "}
                <a data-custom-className="link" href="#software"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#software">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#prohibited"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#prohibited">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      7. PROHIBITED ACTIVITIES
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#ugc"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#ugc">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      8. USER GENERATED CONTRIBUTIONS
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#license"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#license">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      9. CONTRIBUTION
                      <strong className="block-component"></strong>LICENSE
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#reviews"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#reviews">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#mobile"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#mobile">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#socialmedia"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#socialmedia">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>10. SOCIAL
                      MEDIA
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#thirdparty"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#thirdparty">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#advertisers"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#advertisers">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#sitemanage"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#sitemanage">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      11. SERVICES MANAGEMENT
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#ppyes"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#ppyes">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>12. PRIVACY
                      POLICY
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#ppno"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#ppno">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#dmca"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#dmca">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>
                      <strong className="block-component"></strong>
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </span>
                </a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <span data-style="font-size: 15px;">
                  <span data-custom-className="body_text">
                    <strong className="block-component"></strong>
                    <strong className="block-component"></strong>
                  </span>
                </span>
                <a data-custom-className="link" href="#copyrightyes">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      13. COPYRIGHT INFRINGEMENTS
                    </span>
                  </span>
                </a>
                <span data-style="font-size: 15px;">
                  <span data-custom-className="body_text">
                    <strong className="statement-end-if-in-editor"></strong>
                    <strong className="block-component"></strong>
                  </span>
                </span>
                <a data-custom-className="link" href="#terms"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#terms">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      14. TERM AND TERMINATION
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#modifications"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#modifications">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      15. MODIFICATIONS AND INTERRUPTIONS
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#law"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#law">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      16. GOVERNING LAW
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#disputes"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#disputes">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      17. DISPUTE RESOLUTION
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#corrections"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#corrections">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      18. CORRECTIONS
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#disclaimer"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#disclaimer">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      19. DISCLAIMER
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#liability"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#liability">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      20. LIMITATIONS OF LIABILITY
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#indemnification"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#indemnification">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      21. INDEMNIFICATION
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#userdata"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#userdata">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">22. USER DATA</span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#electronic"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#electronic">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      23. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
                      SIGNATURES
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#california"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong className="block-component">
                  <span data-style="font-size: 15px;"></span>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                  <a data-custom-className="link" href="#sms">
                    <span data-custom-className="body_text">
                      24. SMS TEXT MESSAGING
                    </span>
                  </a>
                </span>
                <strong className="statement-end-if-in-editor">
                  <span data-style="font-size: 15px;"></span>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#california">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      <strong className="block-component"></strong>25.
                      CALIFORNIA USERS AND RESIDENTS
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#misc"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <a data-custom-className="link" href="#misc">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      26. MISCELLANEOUS
                    </span>
                  </span>
                </a>{" "}
                <a data-custom-className="link" href="#contact"></a>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <strong className="block-component"></strong>
              </div>
              <div>
                <a data-custom-className="link" href="#contact">
                  <span data-style="color: rgb(0, 58, 250); font-size: 15px;">
                    <span data-custom-className="body_text">
                      27. CONTACT US
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div data-style="text-align: left;">
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                data-style="line-height: 1.5;"
              >
                <a data-name="_b6y29mp52qvx"></a>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="services"
              >
                <strong>
                  <span>
                    <h2>1. OUR SERVICES</h2>
                  </span>
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  The information provided when using the Services is not
                  intended for distribution to or use by any person or entity in
                  any jurisdiction or country where such distribution or use
                  would be contrary to law or regulation or which would subject
                  us to any registration requirement within such jurisdiction or
                  country. Accordingly, those persons who choose to access the
                  Services from other locations do so on their own initiative
                  and are solely responsible for compliance with local laws, if
                  and to the extent local laws are applicable.
                  <strong className="block-component"></strong>
                </span>
                <strong className="block-component">
                  <span></span>
                </strong>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  The Services are not tailored to comply with industry-specific
                  regulations (Health Insurance Portability and Accountability
                  Act (HIPAA), Federal Information Security Management Act
                  (FISMA), etc.), so if your interactions would be subjected to
                  such laws, you may not use the Services. You may not use the
                  Services in a way that would violate the Gramm-Leach-Bliley
                  Act (GLBA).<strong className="block-component"></strong>
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
            </div>
            <div data-custom-className="heading_1">
              <strong>
                <span id="ip">
                  <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
                </span>
              </strong>
            </div>
            <div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <strong>
                  <h3>Our intellectual property</h3>
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  We are the owner or the licensee of all intellectual property
                  rights in our Services, including all source code, databases,
                  functionality, software, website designs, audio, video, text,
                  photographs, and graphics in the Services (collectively, the{" "}
                  <strong className="block-component"></strong>"Content"
                  <strong className="statement-end-if-in-editor"></strong>), as
                  well as the trademarks, service marks, and logos contained
                  therein (the <strong className="block-component"></strong>
                  "Marks"
                  <strong className="statement-end-if-in-editor"></strong>).
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  Our Content and Marks are protected by copyright and trademark
                  laws (and various other intellectual property rights and
                  unfair competition laws) and treaties
                  <strong className="block-component"></strong> in the United
                  States and
                  <strong className="statement-end-if-in-editor"></strong>{" "}
                  around the world.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  The Content and Marks are provided in or through the Services{" "}
                  <strong className="block-component"></strong>"AS IS"
                  <strong className="statement-end-if-in-editor"></strong> for
                  your <strong className="block-component"></strong>personal,
                  non-commercial use
                  <strong className="block-component"></strong>
                  only.
                </span>
              </div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <strong>
                  <h3>Your use of our Services</h3>
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  Subject to your compliance with these Legal Terms, including
                  the <strong className="block-component"></strong>"
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
                <a data-custom-className="link" href="#prohibited">
                  <span>PROHIBITED ACTIVITIES</span>
                </a>
                <span>
                  <strong className="block-component"></strong>"
                  <strong className="statement-end-if-in-editor"></strong>{" "}
                  section below, we grant you a non-exclusive, non-transferable,
                  revocable <strong className="block-component"></strong>license
                  <strong className="statement-end-if-in-editor"></strong>
                  to:
                </span>
              </div>
              <ul>
                <li className="MsoNormal" data-custom-className="body_text">
                  <span>access the Services; and</span>
                </li>
                <li className="MsoNormal" data-custom-className="body_text">
                  <span>
                    download or print a copy of any portion of the Content to
                    which you have properly gained access,
                  </span>
                </li>
              </ul>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  solely for your <strong className="block-component"></strong>
                  personal, non-commercial use
                  <strong className="block-component"></strong>.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  Except as set out in this section or elsewhere in our Legal
                  Terms, no part of the Services and no Content or Marks may be
                  copied, reproduced, aggregated, republished, uploaded, posted,
                  publicly displayed, encoded, translated, transmitted,
                  distributed, sold, licensed, or otherwise exploited for any
                  commercial purpose whatsoever, without our express prior
                  written permission.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  If you wish to make any use of the Services, Content, or Marks
                  other than as set out in this section or elsewhere in our
                  Legal Terms, please address your request to:{" "}
                  <strong className="question">contact@cesarolvr.com</strong>.
                  If we ever grant you the permission to post, reproduce, or
                  publicly display any part of our Services or Content, you must
                  identify us as the owners or licensors of the Services,
                  Content, or Marks and ensure that any copyright or proprietary
                  notice appears or is visible on posting, reproducing, or
                  displaying our Content.
                </span>
              </div>
            </div>
            <div>
              <br />
            </div>
            <div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  We reserve all rights not expressly granted to you in and to
                  the Services, Content, and Marks.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  Any breach of these Intellectual Property Rights will
                  constitute a material breach of our Legal Terms and your right
                  to use our Services will terminate immediately.
                </span>
              </div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <span>
                  <strong>
                    <h3>
                      Your submissions
                      <strong className="block-component"></strong> and
                      contributions
                    </h3>
                  </strong>
                  <strong className="statement-end-if-in-editor">
                    <strong></strong>
                  </strong>
                </span>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  Please review this section and the{" "}
                  <strong className="block-component"></strong>"
                  <strong className="statement-end-if-in-editor"></strong>
                  <a data-custom-className="link" href="#prohibited">
                    <span>PROHIBITED ACTIVITIES</span>
                  </a>
                  <strong className="block-component"></strong>"
                  <strong className="statement-end-if-in-editor"></strong>{" "}
                  section carefully prior to using our Services to understand
                  the (a) rights you give us and (b) obligations you have when
                  you post or upload any content through the Services.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  <strong>Submissions:</strong> By directly sending us any
                  question, comment, suggestion, idea, feedback, or other
                  information about the Services (
                  <strong className="block-component"></strong>"Submissions"
                  <strong className="statement-end-if-in-editor"></strong>), you
                  agree to assign to us all intellectual property rights in such
                  Submission. You agree that we shall own this Submission and be
                  entitled to its unrestricted use and dissemination for any
                  lawful purpose, commercial or otherwise, without
                  acknowledgment or compensation to you.
                  <strong className="block-component"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  <strong>Contributions:</strong> The Services may invite you to
                  chat, contribute to, or participate in blogs, message boards,
                  online forums, and other functionality during which you may
                  create, submit, post, display, transmit, publish, distribute,
                  or broadcast content and materials to us or through the
                  Services, including but not limited to text, writings, video,
                  audio, photographs, music, graphics, comments, reviews, rating
                  suggestions, personal information, or other material (
                  <strong className="block-component"></strong>"Contributions"
                  <strong className="statement-end-if-in-editor"></strong>). Any
                  Submission that is publicly posted shall also be treated as a
                  Contribution.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  You understand that Contributions may be viewable by other
                  users of the Services
                  <strong className="block-component"></strong>.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  <strong>
                    When you post Contributions, you grant us a{" "}
                    <strong className="block-component"></strong>license
                    <strong className="statement-end-if-in-editor"></strong>
                    (including use of your name, trademarks, and logos):&nbsp;
                  </strong>
                  By posting any Contributions, you grant us an unrestricted,
                  unlimited, irrevocable, perpetual, non-exclusive,
                  transferable, royalty-free, fully-paid, worldwide right, and{" "}
                  <strong className="block-component"></strong>license
                  <strong className="statement-end-if-in-editor"></strong> to:
                  use, copy, reproduce, distribute, sell, resell, publish,
                  broadcast, retitle, store, publicly perform, publicly display,
                  reformat, translate, excerpt (in whole or in part), and
                  exploit your Contributions (including, without limitation,
                  your image, name, and voice) for any purpose, commercial,
                  advertising, or otherwise, to prepare derivative works of, or
                  incorporate into other works, your Contributions, and to{" "}
                  <strong className="block-component"></strong>sublicense the
                  licenses
                  <strong className="statement-end-if-in-editor"></strong>{" "}
                  granted in this section. Our use and distribution may occur in
                  any media formats and through any media channels.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  This <strong className="block-component"></strong>license
                  <strong className="statement-end-if-in-editor"></strong>{" "}
                  includes our use of your name, company name, and franchise
                  name, as applicable, and any of the trademarks, service marks,
                  trade names, logos, and personal and commercial images you
                  provide.
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  <strong>
                    You are responsible for what you post or upload:
                  </strong>{" "}
                  By sending us Submissions
                  <strong className="block-component"></strong> and/or posting
                  Contributions
                  <strong className="statement-end-if-in-editor"></strong>{" "}
                  through any part of the Services
                  <strong className="block-component"></strong> or making
                  Contributions accessible through the Services by linking your
                  account through the Services to any of your social networking
                  accounts,
                  <strong className="statement-end-if-in-editor"></strong> you:
                </span>
              </div>
              <ul>
                <li className="MsoNormal" data-custom-className="body_text">
                  <span>
                    confirm that you have read and agree with our
                    <strong className="block-component"></strong>"
                    <strong className="statement-end-if-in-editor"></strong>
                  </span>
                  <a data-custom-className="link" href="#prohibited">
                    <span>PROHIBITED ACTIVITIES</span>
                  </a>
                  <span>
                    <strong className="block-component"></strong>"
                    <strong className="statement-end-if-in-editor"></strong> and
                    will not post, send, publish, upload, or transmit through
                    the Services any Submission
                    <strong className="block-component"></strong> nor post any
                    Contribution
                    <strong className="statement-end-if-in-editor"></strong>{" "}
                    that is illegal, harassing, hateful, harmful, defamatory,
                    obscene, bullying, abusive, discriminatory, threatening to
                    any person or group, sexually explicit, false, inaccurate,
                    deceitful, or misleading;
                  </span>
                </li>
                <li className="MsoNormal" data-custom-className="body_text">
                  <span>
                    to the extent permissible by applicable law, waive any and
                    all moral rights to any such Submission
                    <strong className="block-component"></strong> and/or
                    Contribution
                    <strong className="statement-end-if-in-editor"></strong>;
                  </span>
                </li>
                <li className="MsoNormal" data-custom-className="body_text">
                  <span>
                    warrant that any such Submission
                    <strong className="block-component"></strong> and/or
                    Contributions
                    <strong className="statement-end-if-in-editor"></strong> are
                    original to you or that you have the necessary rights and{" "}
                    <strong className="block-component"></strong>licenses
                    <strong className="statement-end-if-in-editor"></strong> to
                    submit such Submissions
                    <strong className="block-component"></strong> and/or
                    Contributions
                    <strong className="statement-end-if-in-editor"></strong> and
                    that you have full authority to grant us the above-mentioned
                    rights in relation to your Submissions
                    <strong className="block-component"></strong> and/or
                    Contributions
                    <strong className="statement-end-if-in-editor"></strong>;
                    and
                  </span>
                </li>
                <li className="MsoNormal" data-custom-className="body_text">
                  <span>
                    warrant and represent that your Submissions
                    <strong className="block-component"></strong> and/or
                    Contributions
                    <strong className="statement-end-if-in-editor"></strong> do
                    not constitute confidential information.
                  </span>
                </li>
              </ul>
              <div className="MsoNormal" data-custom-className="body_text">
                You are solely responsible for your Submissions
                <strong className="block-component"></strong> and/or
                Contributions
                <strong className="statement-end-if-in-editor"></strong> and you
                expressly agree to reimburse us for any and all losses that we
                may suffer because of your breach of (a) this section, (b) any
                third party’s intellectual property rights, or (c) applicable
                law.<strong className="block-component"></strong>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <strong>We may remove or edit your Content:</strong>
                Although we have no obligation to monitor any Contributions, we
                shall have the right to remove or edit any Contributions at any
                time without notice if in our reasonable opinion we consider
                such Contributions harmful or in breach of these Legal Terms. If
                we remove or edit any such Contributions, we may also suspend or
                disable your account and report you to the authorities.
                <strong className="statement-end-if-in-editor"></strong>
                <strong className="block-component"></strong>
              </div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <strong>
                  <h3>Copyright infringement</h3>
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                We respect the intellectual property rights of others. If you
                believe that any material available on or through the Services
                infringes upon any copyright you own or control, please
                immediately refer to the{" "}
                <strong className="block-component"></strong>"
                <strong className="statement-end-if-in-editor"></strong>
                <a data-custom-className="link" href="#dmca">
                  <span>
                    <strong className="block-component"></strong>
                    <strong className="block-component"></strong>
                  </span>
                  <strong className="statement-end-if-in-editor"></strong>
                </a>
                <strong className="block-component"></strong>
                <a data-custom-className="link" href="#copyrightyes">
                  <span>
                    <strong className="block-component"></strong>COPYRIGHT
                    INFRINGEMENTS
                    <strong className="statement-end-if-in-editor"></strong>
                  </span>
                </a>
                <strong className="block-component"></strong>
                <strong className="block-component"></strong>"
                <strong className="statement-end-if-in-editor"></strong> section
                below.<strong className="statement-end-if-in-editor"></strong>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
            </div>
            <div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="userreps"
              >
                <a data-name="_5hg7kgyv9l8z"></a>
                <strong>
                  <span>
                    <h2>3. USER REPRESENTATIONS</h2>
                  </span>
                </strong>
              </div>
            </div>
            <div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  By using the Services, you represent and warrant that:
                </span>
                <strong
                  className="block-container if"
                  data-type="if"
                  id="d2d82ca8-275f-3f86-8149-8a5ef8054af6"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="user_account_option"
                      data-type="statement"
                    ></strong>
                    <strong data-type="body">
                      <span>(</span>
                      <span>1</span>
                      <span>
                        ) all registration information you submit will be true,
                        accurate, current, and complete; (
                      </span>
                      <span>2</span>
                      <span>
                        ) you will maintain the accuracy of such information and
                        promptly update such registration information as
                        necessary;
                      </span>
                    </strong>
                  </strong>
                  <strong
                    className="statement-end-if-in-editor"
                    data-type="close"
                  ></strong>
                  &nbsp;
                </strong>
                <span>(</span>
                <span>3</span>
                <span>
                  ) you have the legal capacity and you agree to comply with
                  these Legal Terms;
                </span>
                <strong
                  className="block-container if"
                  data-type="if"
                  id="8d4c883b-bc2c-f0b4-da3e-6d0ee51aca13"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="user_u13_option"
                      data-type="statement"
                    ></strong>
                    &nbsp;
                  </strong>
                  <span>(</span>
                  <span>4</span>
                  <span>
                    ) you are not a minor in the jurisdiction in which you
                    reside
                    <strong
                      className="block-container if"
                      data-type="if"
                      id="76948fab-ec9e-266a-bb91-948929c050c9"
                    >
                      <strong data-type="conditional-block">
                        <strong
                          className="block-component"
                          data-record-question-key="user_o18_option"
                          data-type="statement"
                        ></strong>
                      </strong>
                      ; (
                    </strong>
                  </span>
                  <span>5</span>
                  <span>
                    ) you will not access the Services through automated or
                    non-human means, whether through a bot, script or otherwise;
                    (
                  </span>
                  <span>6</span>
                  <span>
                    ) you will not use the Services for any illegal or{" "}
                    <strong className="block-component"></strong>unauthorized
                    <strong className="statement-end-if-in-editor"></strong>
                    purpose; and (
                  </span>
                  <span>7</span>
                  <span>
                    ) your use of the Services will not violate any applicable
                    law or regulation.
                  </span>
                  <span></span>
                </strong>
              </div>
            </div>
            <div>
              <br />
            </div>
            <div>
              <div className="MsoNormal">
                <div className="MsoNormal">
                  <div className="MsoNormal" data-custom-className="body_text">
                    <span>
                      If you provide any information that is untrue, inaccurate,
                      not current, or incomplete, we have the right to suspend
                      or terminate your account and refuse any and all current
                      or future use of the Services (or any portion thereof).
                    </span>
                  </div>
                  <div className="MsoNormal">
                    <strong className="block-component"></strong>
                  </div>
                  <div className="MsoNormal">
                    <br />
                  </div>
                </div>
                <div className="MsoNormal">
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="heading_1"
                        id="userreg"
                      >
                        <strong>
                          <span>
                            <h2>4. USER REGISTRATION</h2>
                          </span>
                        </strong>
                      </div>
                    </strong>
                  </strong>
                </div>
                <div className="MsoNormal">
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          You may be required to register to use the Services.
                          You agree to keep your password confidential and will
                          be responsible for all use of your account and
                          password. We reserve the right to remove, reclaim, or
                          change a username you select if we determine, in our
                          sole discretion, that such username is inappropriate,
                          obscene, or otherwise objectionable.
                          <strong
                            className="statement-end-if-in-editor"
                            data-type="close"
                          ></strong>
                        </span>
                      </div>
                    </strong>
                  </strong>
                  <strong className="block-component">
                    <span></span>
                  </strong>
                </div>
                <div className="MsoNormal">
                  <strong className="block-component">
                    <span data-style="font-size: 15px;"></span>
                  </strong>
                </div>
                <div
                  className="MsoNormal"
                  data-style="line-height: 1.5; text-align: left;"
                >
                  <br />
                </div>
              </div>
            </div>
            <div data-style="text-align: left;">
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="purchases"
                data-style="line-height: 1.5;"
              >
                <a data-name="_ynub0jdx8pob"></a>
                <strong>
                  <span data-style="line-height: 1.5; font-family: Arial; font-size: 19px;">
                    <h2>5. PURCHASES AND PAYMENT</h2>
                  </span>
                </strong>
              </div>
            </div>
            <div data-style="text-align: left;">
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong className="block-component">
                  <span data-style="font-size: 15px;"></span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  We accept the following forms of payment:
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="text-align:justify;line-height:115%;"
              >
                <div
                  className="MsoNormal"
                  data-style="text-align: left; line-height: 1;"
                >
                  <br />
                </div>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; margin-left: 20px;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  <strong className="forloop-component"></strong>- &nbsp;
                  <strong className="question">Visa</strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; margin-left: 20px;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  <strong className="forloop-component"></strong>- &nbsp;
                  <strong className="question">Mastercard</strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; margin-left: 20px;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  <strong className="forloop-component"></strong>- &nbsp;
                  <strong className="question">American Express</strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; margin-left: 20px;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  <strong className="forloop-component"></strong>- &nbsp;
                  <strong className="question">Discover</strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; margin-left: 20px;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  <strong className="forloop-component"></strong>- &nbsp;
                  <strong className="question">PayPal</strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; margin-left: 20px;"
              >
                <span>
                  <strong className="forloop-component"></strong>
                </span>
              </div>
              <div className="MsoNormal" data-style="line-height: 1;">
                <span>
                  <br />
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5;"
              >
                <span>
                  You agree to provide current, complete, and accurate purchase
                  and account information for all purchases made via the
                  Services. You further agree to promptly update account and
                  payment information, including email address, payment method,
                  and payment card expiration date, so that we can complete your
                  transactions and contact you as needed. Sales tax will be
                  added to the price of purchases as deemed required by us. We
                  may change prices at any time. All payments shall be&nbsp;
                </span>
                <span data-style="font-size: 15px; line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);">
                  in <strong className="question">US dollars</strong>.
                </span>
              </div>
            </div>
            <div data-style="line-height: 1.5;">
              <br />
            </div>
            <div data-style="text-align: left;">
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5;"
              >
                <span>
                  You agree to pay all charges at the prices then in effect for
                  your purchases and any applicable shipping fees, and you{" "}
                  <strong className="block-component"></strong>authorize
                  <strong className="statement-end-if-in-editor"></strong> us to
                  charge your chosen payment provider for any such amounts upon
                  placing your order. We reserve the right to correct any errors
                  or mistakes in pricing, even if we have already requested or
                  received payment.
                </span>
              </div>
            </div>
            <div>
              <br />
            </div>
            <div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  We reserve the right to refuse any order placed through the
                  Services. We may, in our sole discretion, limit or cancel
                  quantities purchased per person, per household, or per order.
                  These restrictions may include orders placed by or under the
                  same customer account, the same payment method, and/or orders
                  that use the same billing or shipping address. We reserve the
                  right to limit or prohibit orders that, in our sole{" "}
                  <strong className="block-component"></strong>judgment
                  <strong className="statement-end-if-in-editor"></strong>,
                  appear to be placed by dealers, resellers, or distributors.
                </span>
                <span>
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="return_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </span>
              </div>
              <div className="MsoNormal">
                <strong className="block-component">
                  <span></span>
                </strong>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="subscriptions"
              >
                <strong>
                  <span>
                    <h2>6. SUBSCRIPTIONS</h2>
                  </span>
                </strong>
              </div>
              <div className="MsoNormal">
                <strong className="block-component"></strong>
              </div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <strong>
                  <span>
                    <h3>Billing and Renewal</h3>
                  </span>
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  <strong className="block-component"></strong>Your subscription
                  will continue and automatically renew unless{" "}
                  <strong className="block-component"></strong>canceled
                  <strong className="statement-end-if-in-editor"></strong>. You
                  consent to our charging your payment method on a recurring
                  basis without requiring your prior approval for each recurring
                  charge, until such time as you cancel the applicable order.
                  <strong className="block-component"></strong> The length of
                  your billing cycle{" "}
                  <strong className="block-component"></strong>is monthly
                  <strong className="block-component"></strong>.
                  <strong className="statement-end-if-in-editor"></strong>
                  <strong className="else-block"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <strong className="block-component">
                  <span></span>
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <span>
                  <strong>
                    <h3>Free Trial</h3>
                  </strong>
                </span>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <span>
                  We offer a <strong className="question">7</strong>-day free
                  trial to new users who register with the Services.{" "}
                  <strong className="block-component"></strong>
                  <strong className="question">
                    The account will be charged according to the user's chosen
                    subscription
                  </strong>{" "}
                  at the end of the free trial.
                  <strong className="else-block"></strong>
                </span>
              </div>
              <div className="MsoNormal">
                <span>
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
                <strong className="block-component">
                  <span></span>
                </strong>
              </div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <span>
                  <strong>
                    <h3>Cancellation</h3>
                  </strong>
                </span>
              </div>
              <div className="MsoNormal" data-custom-className="body_text">
                <strong className="block-component">
                  <span></span>
                </strong>
                <strong className="block-component"></strong>You can cancel your
                subscription at any time by logging into your account.
                <strong className="block-component"></strong> Your cancellation
                will take effect at the end of the current paid term. If you
                have any questions or are unsatisfied with our Services, please
                email us at{" "}
                <strong className="question">contact@cesarolvr.com</strong>.
                <strong className="statement-end-if-in-editor"></strong>
                <br />
              </div>
              <div className="MsoNormal" data-custom-className="heading_2">
                <strong>
                  <span>
                    <h3>Fee Changes</h3>
                  </span>
                </strong>
              </div>
              <span>
                <span data-custom-className="body_text">
                  We may, from time to time, make changes to the subscription
                  fee and will communicate any price changes to you in
                  accordance with applicable law.
                </span>
              </span>
              <div className="MsoNormal">
                <span>
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
                <strong className="block-component">
                  <span></span>
                </strong>
              </div>
              <div className="MsoNormal">
                <strong className="block-component"></strong>
              </div>
              <div className="MsoNormal">
                <span>
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div className="MsoNormal">
                        <br />
                      </div>
                    </strong>
                  </strong>
                </span>
                <div
                  className="MsoNormal"
                  data-custom-className="heading_1"
                  id="prohibited"
                >
                  <strong>
                    <span>
                      <h2>7. PROHIBITED ACTIVITIES</h2>
                    </span>
                  </strong>
                </div>
              </div>
              <div className="MsoNormal">
                <div className="MsoNormal" data-custom-className="body_text">
                  <span>
                    You may not access or use the Services for any purpose other
                    than that for which we make the Services available. The
                    Services may not be used in connection with any commercial{" "}
                    <strong className="block-component"></strong>endeavors
                    <strong className="statement-end-if-in-editor"></strong>{" "}
                    except those that are specifically endorsed or approved by
                    us.
                  </span>
                </div>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div className="MsoNormal">
                <div className="MsoNormal">
                  <div className="MsoNormal">
                    <div className="MsoNormal">
                      <div
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          As a user of the Services, you agree not to:
                        </span>
                      </div>
                    </div>
                    <ul>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            Systematically retrieve data or other content from
                            the Services to create or compile, directly or
                            indirectly, a collection, compilation, database, or
                            directory without written permission from us.
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Trick, defraud, or mislead us and other users,
                                  especially in any attempt to learn sensitive
                                  account information such as user passwords.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Circumvent, disable, or otherwise interfere
                                  with security-related features of the
                                  Services, including features that prevent or
                                  restrict the use or copying of any Content or
                                  enforce limitations on the use of the Services
                                  and/or the Content contained therein.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Disparage, tarnish, or otherwise harm, in our
                                  opinion, us and/or the Services.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Use any information obtained from the Services
                                  in order to harass, abuse, or harm another
                                  person.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Make improper use of our support services or
                                  submit false reports of abuse or misconduct.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Use the Services in a manner inconsistent with
                                  any applicable laws or regulations.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Engage in{" "}
                                  <strong className="block-component"></strong>
                                  unauthorized
                                  <strong className="statement-end-if-in-editor"></strong>{" "}
                                  framing of or linking to the Services.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Upload or transmit (or attempt to upload or to
                                  transmit) viruses, Trojan horses, or other
                                  material, including excessive use of capital
                                  letters and spamming (continuous posting of
                                  repetitive text), that interferes with any
                                  party’s uninterrupted use and enjoyment of the
                                  Services or modifies, impairs, disrupts,
                                  alters, or interferes with the use, features,
                                  functions, operation, or maintenance of the
                                  Services.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span>
                          <span>
                            <span>
                              <span>
                                <span>
                                  Engage in any automated use of the system,
                                  such as using scripts to send comments or
                                  messages, or using any data mining, robots, or
                                  similar data gathering and extraction tools.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Delete the copyright or other proprietary
                                  rights notice from any Content.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Attempt to impersonate another user or person
                                  or use the username of another user.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Upload or transmit (or attempt to upload or to
                                  transmit) any material that acts as a passive
                                  or active information collection or
                                  transmission mechanism, including without
                                  limitation, clear graphics interchange formats
                                  (<strong className="block-component"></strong>
                                  "gifs"
                                  <strong className="statement-end-if-in-editor"></strong>
                                  ), 1×1 pixels, web bugs, cookies, or other
                                  similar devices (sometimes referred to as{" "}
                                  <strong className="block-component"></strong>
                                  "spyware" or "passive collection mechanisms"
                                  or "pcms"
                                  <strong className="statement-end-if-in-editor"></strong>
                                  ).
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Interfere with, disrupt, or create an undue
                                  burden on the Services or the networks or
                                  services connected to the Services.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Harass, annoy, intimidate, or threaten any of
                                  our employees or agents engaged in providing
                                  any portion of the Services to you.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Attempt to bypass any measures of the Services
                                  designed to prevent or restrict access to the
                                  Services, or any portion of the Services.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Copy or adapt the Services' software,
                                  including but not limited to Flash, PHP, HTML,
                                  JavaScript, or other code.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Except as permitted by applicable law,
                                  decipher, decompile, disassemble, or reverse
                                  engineer any of the software comprising or in
                                  any way making up a part of the Services.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Except as may be the result of standard search
                                  engine or Internet browser usage, use, launch,
                                  develop, or distribute any automated system,
                                  including without limitation, any spider,
                                  robot, cheat utility, scraper, or offline
                                  reader that accesses the Services, or use or
                                  launch any{" "}
                                  <strong className="block-component"></strong>
                                  unauthorized
                                  <strong className="statement-end-if-in-editor"></strong>{" "}
                                  script or other software.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Use a buying agent or purchasing agent to make
                                  purchases on the Services.
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Make any{" "}
                                  <strong className="block-component"></strong>
                                  unauthorized
                                  <strong className="statement-end-if-in-editor"></strong>{" "}
                                  use of the Services, including collecting
                                  usernames and/or email addresses of users by
                                  electronic or other means for the purpose of
                                  sending unsolicited email, or creating user
                                  accounts by automated means or under false{" "}
                                  <strong className="block-component"></strong>
                                  pretenses
                                  <strong className="statement-end-if-in-editor"></strong>
                                  .
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 15px;">
                          <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                            <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                              <span data-style="line-height: 16.8667px; color: rgb(89, 89, 89);">
                                <span data-style="font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  Use the Services as part of any effort to
                                  compete with us or otherwise use the Services
                                  and/or the Content for any revenue-generating{" "}
                                  <strong className="block-component"></strong>
                                  endeavor
                                  <strong className="statement-end-if-in-editor"></strong>{" "}
                                  or commercial enterprise.
                                </span>
                                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);font-family: sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: justify; text-indent: -29.4px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial; color: rgb(89, 89, 89);">
                                  <strong className="forloop-component"></strong>
                                </span>
                              </span>
                            </span>
                          </span>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          <strong className="question">
                            Sell or otherwise transfer your profile.
                          </strong>
                          <strong className="forloop-component"></strong>
                        </span>
                      </li>
                      <li
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5; text-align: left;"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          <strong className="question">
                            Use the Services to advertise or offer to sell goods
                            and services.
                          </strong>
                          <strong className="forloop-component"></strong>
                        </span>
                      </li>
                    </ul>
                    <div className="MsoNormal">
                      <br />
                    </div>
                    <strong
                      className="block-container if"
                      data-type="if"
                      data-style="text-align: left;"
                    >
                      <strong data-type="conditional-block">
                        <strong data-type="body">
                          <div
                            className="MsoNormal"
                            data-custom-className="heading_1"
                            id="ugc"
                            data-style="line-height: 1.5;"
                          >
                            <strong>
                              <span data-style="line-height: 1.5; font-size: 19px;">
                                <h2>8. USER GENERATED CONTRIBUTIONS</h2>
                              </span>
                            </strong>
                          </div>
                        </strong>
                      </strong>
                    </strong>
                    <strong
                      className="block-container if"
                      data-type="if"
                      data-style="text-align: left;"
                    >
                      <strong data-type="conditional-block">
                        <strong data-type="body">
                          <div
                            className="MsoNormal"
                            data-custom-className="body_text"
                            data-style="line-height: 1.5;"
                          >
                            <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                              <strong
                                className="block-container if"
                                data-type="if"
                                id="24327c5d-a34f-f7e7-88f1-65a2f788484f"
                                data-style="text-align: left;"
                              >
                                <strong data-type="conditional-block">
                                  <strong
                                    className="block-component"
                                    data-record-question-key="user_post_content_option"
                                    data-type="statement"
                                  ></strong>
                                </strong>
                              </strong>
                              The Services may invite you to chat, contribute
                              to, or participate in blogs, message boards,
                              online forums, and other functionality, and may
                              provide you with the opportunity to create,
                              submit, post, display, transmit, perform, publish,
                              distribute, or broadcast content and materials to
                              us or on the Services, including but not limited
                              to text, writings, video, audio, photographs,
                              graphics, comments, suggestions, or personal
                              information or other material (collectively,{" "}
                              <strong className="block-component"></strong>
                              "Contributions"
                              <strong className="statement-end-if-in-editor"></strong>
                              ). Contributions may be viewable by other users of
                              the Services and through third-party websites. As
                              such, any Contributions you transmit may be
                              treated as non-confidential and non-proprietary.
                              When you create or make available any
                              Contributions, you thereby represent and warrant
                              that:
                              <strong className="else-block">
                                <strong className="block-component"></strong>
                              </strong>
                            </span>
                          </div>
                        </strong>
                      </strong>
                    </strong>
                  </div>
                </div>
                <div className="MsoNormal" data-style="line-height: 17.25px;">
                  <ul data-style="font-size: medium;text-align: left;">
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            The creation, distribution, transmission, public
                            display, or performance, and the accessing,
                            downloading, or copying of your Contributions do not
                            and will not infringe the proprietary rights,
                            including but not limited to the copyright, patent,
                            trademark, trade secret, or moral rights of any
                            third party.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            You are the creator and owner of or have the
                            necessary{" "}
                            <strong className="block-component"></strong>
                            licenses
                            <strong className="statement-end-if-in-editor"></strong>
                            , rights, consents, releases, and permissions to use
                            and to <strong className="block-component"></strong>
                            authorize
                            <strong className="statement-end-if-in-editor"></strong>{" "}
                            us, the Services, and other users of the Services to
                            use your Contributions in any manner contemplated by
                            the Services and these Legal Terms.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            You have the written consent, release, and/or
                            permission of each and every identifiable individual
                            person in your Contributions to use the name or
                            likeness of each and every such identifiable
                            individual person to enable inclusion and use of
                            your Contributions in any manner contemplated by the
                            Services and these Legal Terms.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions are not false, inaccurate, or
                            misleading.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions are not unsolicited or{" "}
                            <strong className="block-component"></strong>
                            unauthorized
                            <strong className="statement-end-if-in-editor"></strong>{" "}
                            advertising, promotional materials, pyramid schemes,
                            chain letters, spam, mass mailings, or other forms
                            of solicitation.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions are not obscene, lewd,
                            lascivious, filthy, violent, harassing,{" "}
                            <strong className="block-component"></strong>
                            libelous
                            <strong className="statement-end-if-in-editor"></strong>
                            , slanderous, or otherwise objectionable (as
                            determined by us).
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions do not ridicule, mock, disparage,
                            intimidate, or abuse anyone.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions are not used to harass or
                            threaten (in the legal sense of those terms) any
                            other person and to promote violence against a
                            specific person or class of people.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions do not violate any applicable
                            law, regulation, or rule.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions do not violate the privacy or
                            publicity rights of any third party.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions do not violate any applicable law
                            concerning child pornography, or otherwise intended
                            to protect the health or well-being of minors.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions do not include any offensive
                            comments that are connected to race, national
                            origin, gender, sexual preference, or physical
                            handicap.
                          </span>
                        </span>
                      </span>
                    </li>
                    <li
                      data-custom-className="body_text"
                      data-style="line-height: 1.5;"
                    >
                      <span data-style="color: rgb(89, 89, 89);">
                        <span data-style="font-size: 14px;">
                          <span data-custom-className="body_text">
                            Your Contributions do not otherwise violate, or link
                            to material that violates, any provision of these
                            Legal Terms, or any applicable law or regulation.
                          </span>
                        </span>
                      </span>
                    </li>
                  </ul>
                  <strong
                    className="block-container if"
                    data-type="if"
                    data-style="text-align: left;"
                  >
                    <strong data-type="conditional-block">
                      <strong data-type="body">
                        <div
                          className="MsoNormal"
                          data-custom-className="body_text"
                          data-style="line-height: 1.5;"
                        >
                          <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                            Any use of the Services in violation of the
                            foregoing violates these Legal Terms and may result
                            in, among other things, termination or suspension of
                            your rights to use the Services.
                          </span>
                        </div>
                      </strong>
                    </strong>
                  </strong>
                </div>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div
                className="MsoNormal"
                data-style="text-align: justify; line-height: 1;"
              >
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="heading_1"
                        id="license"
                        data-style="line-height: 1.5;"
                      >
                        <strong>
                          <span data-style="line-height: 1.5; font-size: 19px;">
                            <h2>
                              9. CONTRIBUTION{" "}
                              <strong className="block-component"></strong>
                              LICENSE
                              <strong className="statement-end-if-in-editor"></strong>
                            </h2>
                          </span>
                        </strong>
                      </div>
                    </strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1;">
                <strong
                  className="block-container if"
                  data-type="if"
                  id="a088ddfb-d8c1-9e58-6f21-958c3f4f0709"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="user_post_content_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </strong>
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5;"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          By posting your Contributions to any part of the
                          Services
                          <strong
                            className="block-container if"
                            data-type="if"
                            id="19652acc-9a2a-5ffe-6189-9474402fa6cc"
                          >
                            <strong data-type="conditional-block">
                              <strong
                                className="block-component"
                                data-record-question-key="socialnetwork_link_option"
                                data-type="statement"
                              ></strong>
                              <strong data-type="body">
                                &nbsp;or making Contributions accessible to the
                                Services by linking your account from the
                                Services to any of your social networking
                                accounts
                              </strong>
                            </strong>
                            <strong
                              className="statement-end-if-in-editor"
                              data-type="close"
                            ></strong>
                          </strong>
                          , you automatically grant, and you represent and
                          warrant that you have the right to grant, to us an
                          unrestricted, unlimited, irrevocable, perpetual,
                          non-exclusive, transferable, royalty-free, fully-paid,
                          worldwide right, and{" "}
                          <strong className="block-component"></strong>license
                          <strong className="statement-end-if-in-editor"></strong>
                          to host, use, copy, reproduce, disclose, sell, resell,
                          publish, broadcast, retitle, archive, store, cache,
                          publicly perform, publicly display, reformat,
                          translate, transmit, excerpt (in whole or in part),
                          and distribute such Contributions (including, without
                          limitation, your image and voice) for any purpose,
                          commercial, advertising, or otherwise, and to prepare
                          derivative works of, or incorporate into other works,
                          such Contributions, and grant and{" "}
                          <strong className="block-component"></strong>authorize
                          sublicenses
                          <strong className="statement-end-if-in-editor"></strong>{" "}
                          of the foregoing. The use and distribution may occur
                          in any media formats and through any media channels.
                        </span>
                      </div>
                    </strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div
                className="MsoNormal"
                data-style="text-align: justify; line-height: 1;"
              >
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5;"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          This <strong className="block-component"></strong>
                          license
                          <strong className="statement-end-if-in-editor"></strong>
                          will apply to any form, media, or technology now known
                          or hereafter developed, and includes our use of your
                          name, company name, and franchise name, as applicable,
                          and any of the trademarks, service marks, trade names,
                          logos, and personal and commercial images you provide.
                          You waive all moral rights in your Contributions, and
                          you warrant that moral rights have not otherwise been
                          asserted in your Contributions.
                        </span>
                      </div>
                    </strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div
                className="MsoNormal"
                data-style="text-align: justify; line-height: 1;"
              >
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5;"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          We do not assert any ownership over your
                          Contributions. You retain full ownership of all of
                          your Contributions and any intellectual property
                          rights or other proprietary rights associated with
                          your Contributions. We are not liable for any
                          statements or representations in your Contributions
                          provided by you in any area on the Services. You are
                          solely responsible for your Contributions to the
                          Services and you expressly agree to exonerate us from
                          any and all responsibility and to refrain from any
                          legal action against us regarding your Contributions.
                        </span>
                      </div>
                    </strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div
                className="MsoNormal"
                data-style="text-align: justify; line-height: 1;"
              >
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5;"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          We have the right, in our sole and absolute
                          discretion, (1) to edit, redact, or otherwise change
                          any Contributions; (2) to{" "}
                          <strong className="block-component"></strong>
                          re-categorize
                          <strong className="statement-end-if-in-editor"></strong>{" "}
                          any Contributions to place them in more appropriate
                          locations on the Services; and (3) to pre-screen or
                          delete any Contributions at any time and for any
                          reason, without notice. We have no obligation to
                          monitor your Contributions.
                        </span>
                      </div>
                    </strong>
                  </strong>
                </strong>
              </div>
            </div>
            <div data-style="text-align: left;">
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                        <strong className="else-block"></strong>
                      </span>
                    </strong>
                  </strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5;"
              >
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="review_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="mobile_app_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="socialnetwork_link_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="socialmedia"
                data-style="line-height: 1.5;"
              >
                <strong>
                  <h2>10. SOCIAL MEDIA</h2>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div
                        className="MsoNormal"
                        data-custom-className="body_text"
                        data-style="line-height: 1.5;"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          As part of the functionality of the Services, you may
                          link your account with online accounts you have with
                          third-party service providers (each such account, a{" "}
                          <strong className="block-component"></strong>
                          "Third-Party Account"
                          <strong className="statement-end-if-in-editor"></strong>
                          ) by either: (1) providing your Third-Party Account
                          login information through the Services; or (2)
                          allowing us to access your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account, as is permitted under the applicable terms
                          and conditions that govern your use of each{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account. You represent and warrant that you are
                          entitled to disclose your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account login information to us and/or grant us access
                          to your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account, without breach by you of any of the terms and
                          conditions that govern your use of the applicable{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account, and without obligating us to pay any fees or
                          making us subject to any usage limitations imposed by
                          the third-party service provider of the
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account. By granting us access to any{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Accounts, you understand that (1) we may access, make
                          available, and store (if applicable) any content that
                          you have provided to and stored in your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account (the{" "}
                          <strong className="block-component"></strong>"Social
                          Network Content"
                          <strong className="statement-end-if-in-editor"></strong>
                          ) so that it is available on and through the Services
                          via your account, including without limitation any
                          friend lists and (2) we may submit to and receive from
                          your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account additional information to the extent you are
                          notified when you link your account with the{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account. Depending on the{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Accounts you choose and subject to the privacy
                          settings that you have set in such{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Accounts, personally identifiable information that you
                          post to your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Accounts may be available on and through your account
                          on the Services. Please note that if a{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account or associated service becomes unavailable or
                          our access to such{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account is terminated by the third-party service
                          provider, then Social Network Content may no longer be
                          available on and through the Services. You will have
                          the ability to disable the connection between your
                          account on the Services and your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Accounts at any time. PLEASE NOTE THAT YOUR
                          RELATIONSHIP WITH THE THIRD-PARTY SERVICE PROVIDERS
                          ASSOCIATED WITH YOUR THIRD-PARTY ACCOUNTS IS GOVERNED
                          SOLELY BY YOUR AGREEMENT(S) WITH SUCH THIRD-PARTY
                          SERVICE PROVIDERS. We make no effort to review any
                          Social Network Content for any purpose, including but
                          not limited to, for accuracy, legality, or
                          non-infringement, and we are not responsible for any
                          Social Network Content. You acknowledge and agree that
                          we may access your email address book associated with
                          a{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account and your contacts list stored on your mobile
                          device or tablet computer solely for purposes of
                          identifying and informing you of those contacts who
                          have also registered to use the Services. You can
                          deactivate the connection between the Services and
                          your{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account by contacting us using the contact information
                          below or through your account settings (if
                          applicable). We will attempt to delete any information
                          stored on our servers that was obtained through such{" "}
                          <span data-style="font-size: 14.6667px;">
                            Third-Party
                          </span>{" "}
                          Account, except the username and profile picture that
                          become associated with your account.
                        </span>
                      </div>
                    </strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div className="MsoNormal" data-style="line-height: 1.1;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong data-type="body">
                      <div className="MsoNormal" data-style="line-height: 1.5;">
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);"></span>
                      </div>
                    </strong>
                  </strong>
                </strong>
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="3rd_party_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="advertiser_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="sitemanage"
                data-style="line-height: 1.5;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-size: 19px;">
                    <h2>11. SERVICES MANAGEMENT</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5;"
              >
                We reserve the right, but not the obligation, to: (1) monitor
                the Services for violations of these Legal Terms; (2) take
                appropriate legal action against anyone who, in our sole
                discretion, violates the law or these Legal Terms, including
                without limitation, reporting such user to law enforcement
                authorities; (3) in our sole discretion and without limitation,
                refuse, restrict access to, limit the availability of, or
                disable (to the extent technologically feasible) any of your
                Contributions or any portion thereof; (4) in our sole discretion
                and without limitation, notice, or liability, to remove from the
                Services or otherwise disable all files and content that are
                excessive in size or are in any way burdensome to our systems;
                and (5) otherwise manage the Services in a manner designed to
                protect our rights and property and to facilitate the proper
                functioning of the Services.
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="privacy_policy_option"
                      data-type="statement"
                    ></strong>
                  </strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="ppyes"
                data-style="line-height: 1.5;"
              >
                <strong>
                  <h2>12. PRIVACY POLICY</h2>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  We care about data privacy and security. Please review our
                  Privacy Policy:
                  <strong>
                    &nbsp;
                    <span data-style="color: rgb(0, 58, 250);">
                      <strong
                        className="block-container question question-in-editor"
                        data-id="d10c7fd7-0685-12ac-c717-cbc45ff916d1"
                        data-type="question"
                      >
                        <a
                          href="https://www.journeylog.app/privacy-policy"
                          target="_blank"
                          data-custom-className="link"
                        >
                          https://www.journeylog.app/privacy-policy
                        </a>
                      </strong>
                    </span>
                  </strong>
                  . By using the Services, you agree to be bound by our Privacy
                  Policy, which is incorporated into these Legal Terms. Please
                  be advised the Services are hosted in{" "}
                  <strong className="block-component"></strong>the{" "}
                  <strong className="question">United States</strong>
                  <strong className="block-component"></strong>
                  <strong className="block-component"></strong>. If you access
                  the Services from any other region of the world with laws or
                  other requirements governing personal data collection, use, or
                  disclosure that differ from applicable laws in
                  <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                    <strong className="block-component"></strong>the{" "}
                    <strong className="question">United States</strong>
                    <strong className="block-component"></strong>
                  </span>
                  <strong className="block-component"></strong>, then through
                  your continued use of the Services, you are transferring your
                  data to{" "}
                  <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                    <strong className="block-component"></strong>the{" "}
                    <strong className="question">United States</strong>
                    <strong className="block-component"></strong>
                  </span>
                  <strong className="block-component"></strong>, and you
                  expressly consent to have your data transferred to and
                  processed in{" "}
                  <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                    <strong className="block-component"></strong>the{" "}
                    <strong className="question">United States</strong>
                    <strong className="block-component"></strong>
                  </span>
                  <strong className="block-component"></strong>.
                  <strong className="block-component"></strong>
                  <strong
                    className="block-container if"
                    data-type="if"
                    id="547bb7bb-ecf2-84b9-1cbb-a861dc3e14e7"
                  >
                    <strong data-type="conditional-block">
                      <strong
                        className="block-component"
                        data-record-question-key="user_u13_option"
                        data-type="statement"
                      >
                        <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                          <strong className="statement-end-if-in-editor"></strong>
                        </span>
                      </strong>
                    </strong>
                  </strong>
                </span>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <br />
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong
                    className="statement-end-if-in-editor"
                    data-type="close"
                  ></strong>
                </strong>
                <strong className="block-container if" data-type="if">
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="privacy_policy_followup"
                      data-type="statement"
                      data-style="font-size: 14.6667px;"
                    ></strong>
                  </strong>
                </strong>
              </div>
              <div className="MsoNormal" data-style="line-height: 1.5;">
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong data-type="conditional-block">
                    <strong
                      className="block-component"
                      data-record-question-key="copyright_agent_option"
                      data-type="statement"
                    >
                      <strong className="block-component"></strong>
                      <strong className="block-component"></strong>
                    </strong>
                    <strong
                      className="block-container if"
                      data-type="if"
                      data-style="text-align: left;"
                    >
                      <strong
                        className="statement-end-if-in-editor"
                        data-type="close"
                      ></strong>
                    </strong>
                  </strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component"></strong>
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong
                    className="statement-end-if-in-editor"
                    data-type="close"
                  >
                    <strong className="block-component"></strong>
                  </strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="copyrightyes"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="font-size: 19px; line-height: 1.5;">
                    <h2>13. COPYRIGHT INFRINGEMENTS</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  We respect the intellectual property rights of others. If you
                  believe that any material available on or through the Services
                  infringes upon any copyright you own or control, please
                  immediately notify us using the contact information provided
                  below (a
                  <strong className="block-component"></strong>"Notification"
                  <strong className="statement-end-if-in-editor"></strong>). A
                  copy of your Notification will be sent to the person who
                  posted or stored the material addressed in the Notification.
                  Please be advised that pursuant to applicable law you may be
                  held liable for damages if you make material
                  misrepresentations in a Notification. Thus, if you are not
                  sure that material located on or linked to by the Services
                  infringes your copyright, you should consider first contacting
                  an attorney.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong
                  className="block-container if"
                  data-type="if"
                  data-style="text-align: left;"
                >
                  <strong
                    className="statement-end-if-in-editor"
                    data-type="close"
                  ></strong>
                </strong>
                <strong className="block-component"></strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="terms"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-size: 19px;">
                    <h2>14. TERM AND TERMINATION</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  These Legal Terms shall remain in full force and effect while
                  you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF
                  THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE
                  DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND
                  USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES),
                  TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING
                  WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY,
                  OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY
                  APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR
                  PARTICIPATION IN THE SERVICES OR DELETE{" "}
                  <strong
                    className="block-container if"
                    data-type="if"
                    id="a6e121c2-36b4-5066-bf9f-a0a33512e768"
                  >
                    <strong data-type="conditional-block">
                      <strong
                        className="block-component"
                        data-record-question-key="user_account_option"
                        data-type="statement"
                      ></strong>
                      <strong data-type="body">YOUR ACCOUNT AND&nbsp;</strong>
                    </strong>
                    <strong
                      className="statement-end-if-in-editor"
                      data-type="close"
                    ></strong>
                  </strong>
                  ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME,
                  WITHOUT WARNING, IN OUR SOLE DISCRETION.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  If we terminate or suspend your account for any reason, you
                  are prohibited from registering and creating a new account
                  under your name, a fake or borrowed name, or the name of any
                  third party, even if you may be acting on behalf of the third
                  party. In addition to terminating or suspending your account,
                  we reserve the right to take appropriate legal action,
                  including without limitation pursuing civil, criminal, and
                  injunctive redress.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="modifications"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-size: 19px;">
                    <h2>15. MODIFICATIONS AND INTERRUPTIONS</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  We reserve the right to change, modify, or remove the contents
                  of the Services at any time or for any reason at our sole
                  discretion without notice. However, we have no obligation to
                  update any information on our Services.
                  <strong className="block-component"></strong> We will not be
                  liable to you or any third party for any modification, price
                  change, suspension, or discontinuance of the Services.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  We cannot guarantee the Services will be available at all
                  times. We may experience hardware, software, or other problems
                  or need to perform maintenance related to the Services,
                  resulting in interruptions, delays, or errors. We reserve the
                  right to change, revise, update, suspend, discontinue, or
                  otherwise modify the Services at any time or for any reason
                  without notice to you. You agree that we have no liability
                  whatsoever for any loss, damage, or inconvenience caused by
                  your inability to access or use the Services during any
                  downtime or discontinuance of the Services. Nothing in these
                  Legal Terms will be construed to obligate us to maintain and
                  support the Services or to supply any corrections, updates, or
                  releases in connection therewith.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="law"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-size: 19px;">
                    <h2>16. GOVERNING LAW</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  <strong className="block-component"></strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                  These Legal Terms shall be governed by and defined following
                  the laws of <strong className="block-component"></strong>
                  <strong className="question">Brazil</strong>
                  <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                    <strong className="statement-end-if-in-editor"></strong>
                  </span>
                  . <strong className="question">Journeylog</strong>
                  and yourself irrevocably consent that the courts of{" "}
                  <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                    <strong className="block-component"></strong>
                    <strong className="question">Brazil</strong>
                    <span data-style="font-size: 11pt; line-height: 16.8667px; color: rgb(89, 89, 89);">
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </span>{" "}
                  shall have exclusive jurisdiction to resolve any dispute which
                  may arise in connection with these Legal Terms.
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="disputes"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-size: 19px;">
                    <h2>17. DISPUTE RESOLUTION</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component"></strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component"></strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_2"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <h3>Informal Negotiations</h3>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  To expedite resolution and control the cost of any dispute,
                  controversy, or claim related to these Legal Terms (each a{" "}
                  <strong className="block-component"></strong>"Dispute" and
                  collectively, the "Disputes"
                  <strong className="statement-end-if-in-editor"></strong>)
                  brought by either you or us (individually, a{" "}
                  <strong className="block-component"></strong>"Party" and
                  collectively, the "Parties"
                  <strong className="statement-end-if-in-editor"></strong>), the
                  Parties agree to first attempt to negotiate any Dispute
                  (except those Disputes expressly provided below) informally
                  for at least <strong className="question">thirty (30)</strong>{" "}
                  days before initiating arbitration. Such informal negotiations
                  commence upon written notice from one Party to the other
                  Party.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="statement-end-if-in-editor"></strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_2"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <h3>Binding Arbitration</h3>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component">
                  <span data-style="font-size: 15px;"></span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                Any dispute arising out of or in connection with these Legal
                Terms, including any question regarding its existence, validity,
                or termination, shall be referred to and finally resolved by the
                International Commercial Arbitration Court under the European
                Arbitration Chamber (Belgium, Brussels, Avenue Louise, 146)
                according to the Rules of this ICAC, which, as a result of
                referring to it, is considered as the part of this clause. The
                number of arbitrators shall be{" "}
                <strong className="question">three (3)</strong>. The seat, or
                legal place, or arbitration shall be{" "}
                <strong className="block-component"></strong>
                <strong className="question">São Paulo</strong>,{" "}
                <strong className="block-component"></strong>
                <strong className="question">Brazil</strong>
                <strong className="statement-end-if-in-editor"></strong>
                <strong className="else-block"></strong>. The language of the
                proceedings shall be{" "}
                <strong className="question">Portuguese</strong>. The governing
                law of these Legal Terms shall be substantive law of{" "}
                <strong className="block-component"></strong>
                <strong className="block-component"></strong>
                <strong className="question">Brazil</strong>
                <strong className="statement-end-if-in-editor">
                  <strong className="statement-end-if-in-editor"></strong>
                </strong>
                .
                <strong className="statement-end-if-in-editor">
                  <strong className="statement-end-if-in-editor"></strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_2"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <h3>Restrictions</h3>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                The Parties agree that any arbitration shall be limited to the
                Dispute between the Parties individually. To the full extent
                permitted by law, (a) no arbitration shall be joined with any
                other proceeding; (b) there is no right or authority for any
                Dispute to be arbitrated on a class-action basis or to{" "}
                <strong className="block-component"></strong>utilize
                <strong className="statement-end-if-in-editor"></strong> class
                action procedures; and (c) there is no right or authority for
                any Dispute to be brought in a purported representative capacity
                on behalf of the general public or any other persons.
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_2"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component"></strong>
                <strong>
                  <h3>Exceptions to Informal Negotiations and Arbitration</h3>
                </strong>{" "}
                <strong className="statement-end-if-in-editor"></strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component"></strong>The Parties agree
                that the following Disputes are not subject to the above
                provisions concerning informal negotiations binding arbitration:
                (a) any Disputes seeking to enforce or protect, or concerning
                the validity of, any of the intellectual property rights of a
                Party; (b) any Dispute related to, or arising from, allegations
                of theft, piracy, invasion of privacy, or{" "}
                <strong className="block-component"></strong>unauthorized
                <strong className="statement-end-if-in-editor"></strong> use;
                and (c) any claim for injunctive relief. If this provision is
                found to be illegal or unenforceable, then neither Party will
                elect to arbitrate any Dispute falling within that portion of
                this provision found to be illegal or unenforceable and such
                Dispute shall be decided by a court of competent jurisdiction
                within the courts listed for jurisdiction above, and the Parties
                agree to submit to the personal jurisdiction of that court.
                <strong className="statement-end-if-in-editor"></strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="statement-end-if-in-editor">
                  <strong className="statement-end-if-in-editor"></strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="corrections"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="font-size: 19px; line-height: 1.5;">
                    <h2>18. CORRECTIONS</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                There may be information on the Services that contains
                typographical errors, inaccuracies, or omissions, including
                descriptions, pricing, availability, and various other
                information. We reserve the right to correct any errors,
                inaccuracies, or omissions and to change or update the
                information on the Services at any time, without prior notice.
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="disclaimer"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 19px; line-height: 1.5; color: rgb(0, 0, 0);">
                  <strong>
                    <h2>19. DISCLAIMER</h2>
                  </strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS.
                  YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE
                  RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL
                  WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE
                  SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION,
                  THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                  PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE MAKE NO
                  WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR
                  COMPLETENESS OF THE SERVICES' CONTENT OR THE CONTENT OF ANY
                  WEBSITES OR MOBILE APPLICATIONS LINKED TO THE SERVICES AND WE
                  WILL ASSUME NO LIABILITY OR RESPONSIBILITY FOR ANY (1) ERRORS,
                  MISTAKES, OR INACCURACIES OF CONTENT AND MATERIALS, (2)
                  PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
                  RESULTING FROM YOUR ACCESS TO AND USE OF THE SERVICES, (3) ANY{" "}
                  <strong className="block-component"></strong>UNAUTHORIZED
                  <strong className="statement-end-if-in-editor"></strong>{" "}
                  ACCESS TO OR USE OF OUR SECURE SERVERS AND/OR ANY AND ALL
                  PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED
                  THEREIN, (4) ANY INTERRUPTION OR CESSATION OF TRANSMISSION TO
                  OR FROM THE SERVICES, (5) ANY BUGS, VIRUSES, TROJAN HORSES, OR
                  THE LIKE WHICH MAY BE TRANSMITTED TO OR THROUGH THE SERVICES
                  BY ANY THIRD PARTY, AND/OR (6) ANY ERRORS OR OMISSIONS IN ANY
                  CONTENT AND MATERIALS OR FOR ANY LOSS OR DAMAGE OF ANY KIND
                  INCURRED AS A RESULT OF THE USE OF ANY CONTENT POSTED,
                  TRANSMITTED, OR OTHERWISE MADE AVAILABLE VIA THE SERVICES. WE
                  DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY
                  FOR ANY PRODUCT OR SERVICE ADVERTISED OR OFFERED BY A THIRD
                  PARTY THROUGH THE SERVICES, ANY HYPERLINKED WEBSITE, OR ANY
                  WEBSITE OR MOBILE APPLICATION FEATURED IN ANY BANNER OR OTHER
                  ADVERTISING, AND WE WILL NOT BE A PARTY TO OR IN ANY WAY BE
                  RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND ANY
                  THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES. AS WITH THE
                  PURCHASE OF A PRODUCT OR SERVICE THROUGH ANY MEDIUM OR IN ANY
                  ENVIRONMENT, YOU SHOULD USE YOUR BEST{" "}
                  <strong className="block-component"></strong>JUDGMENT
                  <strong className="statement-end-if-in-editor"></strong> AND
                  EXERCISE CAUTION WHERE APPROPRIATE.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="liability"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-family: Arial; font-size: 19px;">
                    <h2>20. LIMITATIONS OF LIABILITY</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  <span data-custom-className="body_text">
                    IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS
                    BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT,
                    INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
                    PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS
                    OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE
                    SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF
                    SUCH DAMAGES.
                  </span>{" "}
                  <strong
                    className="block-container if"
                    data-type="if"
                    id="3c3071ce-c603-4812-b8ca-ac40b91b9943"
                  >
                    <span data-custom-className="body_text">
                      <strong data-type="conditional-block">
                        <strong
                          className="block-component"
                          data-record-question-key="limitations_liability_option"
                          data-type="statement"
                        ></strong>
                        <strong data-type="body">
                          NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED
                          HEREIN, OUR LIABILITY TO YOU FOR ANY CAUSE WHATSOEVER
                          AND REGARDLESS OF THE FORM OF THE ACTION, WILL AT ALL
                          TIMES BE LIMITED TO{" "}
                          <strong
                            className="block-container if"
                            data-type="if"
                            id="73189d93-ed3a-d597-3efc-15956fa8e04e"
                          >
                            <strong data-type="conditional-block">
                              <strong
                                className="block-component"
                                data-record-question-key="limitations_liability_option"
                                data-type="statement"
                              ></strong>
                              <strong data-type="body">
                                THE AMOUNT PAID, IF ANY, BY YOU TO US
                                <strong
                                  className="block-container if"
                                  data-type="if"
                                  id="19e172cb-4ccf-1904-7c06-4251800ba748"
                                >
                                  <strong data-type="conditional-block">
                                    <strong
                                      className="block-component"
                                      data-record-question-key="limilation_liability_time_option"
                                      data-type="statement"
                                    >
                                      &nbsp;
                                    </strong>
                                    <strong data-type="body">
                                      <span data-style="font-size: 11pt; color: rgb(89, 89, 89); text-transform: uppercase;">
                                        DURING THE{" "}
                                        <strong
                                          className="block-container question question-in-editor"
                                          data-id="5dd68d46-ed6f-61c7-cd66-6b3f424b6bdd"
                                          data-type="question"
                                        >
                                          six (6)
                                        </strong>
                                        mONTH PERIOD PRIOR TO ANY CAUSE OF
                                        ACTION ARISING
                                      </span>
                                    </strong>
                                  </strong>
                                  <strong
                                    className="statement-end-if-in-editor"
                                    data-type="close"
                                  ></strong>
                                </strong>
                              </strong>
                            </strong>
                            <strong data-type="conditional-block">
                              <strong
                                className="block-component"
                                data-record-question-key="limitations_liability_option"
                                data-type="statement"
                              >
                                .
                              </strong>
                            </strong>
                          </strong>
                        </strong>
                      </strong>
                    </span>
                  </strong>
                  &nbsp;
                </span>
                <span data-custom-className="body_text">
                  CERTAIN US STATE LAWS AND INTERNATIONAL LAWS DO NOT ALLOW
                  LIMITATIONS ON IMPLIED WARRANTIES OR THE EXCLUSION OR
                  LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU,
                  SOME OR ALL OF THE ABOVE DISCLAIMERS OR LIMITATIONS MAY NOT
                  APPLY TO YOU, AND YOU MAY HAVE ADDITIONAL RIGHTS.
                </span>
                <strong
                  className="statement-end-if-in-editor"
                  data-type="close"
                >
                  <span data-custom-className="body_text"></span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="indemnification"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-family: Arial; font-size: 19px;">
                    <h2>21. INDEMNIFICATION</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  You agree to defend, indemnify, and hold us harmless,
                  including our subsidiaries, affiliates, and all of our
                  respective officers, agents, partners, and employees, from and
                  against any loss, damage, liability, claim, or demand,
                  including reasonable attorneys’ fees and expenses, made by any
                  third party due to or arising out of:{" "}
                  <strong
                    className="block-container if"
                    data-type="if"
                    id="475fffa5-05ca-def8-ac88-f426b238903c"
                  >
                    <strong data-type="conditional-block">
                      <strong
                        className="block-component"
                        data-record-question-key="user_post_content_option"
                        data-type="statement"
                      ></strong>
                      <strong data-type="body">
                        (1) your Contributions;&nbsp;
                      </strong>
                    </strong>
                    <strong
                      className="statement-end-if-in-editor"
                      data-type="close"
                    ></strong>
                  </strong>
                  (<span data-style="font-size: 14.6667px;">2</span>) use of the
                  Services; (<span data-style="font-size: 14.6667px;">3</span>)
                  breach of these Legal Terms; (
                  <span data-style="font-size: 14.6667px;">4</span>) any breach
                  of your representations and warranties set forth in these
                  Legal Terms; (
                  <span data-style="font-size: 14.6667px;">5</span>) your
                  violation of the rights of a third party, including but not
                  limited to intellectual property rights; or (
                  <span data-style="font-size: 14.6667px;">6</span>) any overt
                  harmful act toward any other user of the Services with whom
                  you connected via the Services. Notwithstanding the foregoing,
                  we reserve the right, at your expense, to assume the exclusive{" "}
                  <strong className="block-component"></strong>defense
                  <strong className="statement-end-if-in-editor"></strong> and
                  control of any matter for which you are required to indemnify
                  us, and you agree to cooperate, at your expense, with our{" "}
                  <strong className="block-component"></strong>defense
                  <strong className="statement-end-if-in-editor"></strong> of
                  such claims. We will use reasonable efforts to notify you of
                  any such claim, action, or proceeding which is subject to this
                  indemnification upon becoming aware of it.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="userdata"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-family: Arial; font-size: 19px;">
                    <h2>22. USER DATA</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  We will maintain certain data that you transmit to the
                  Services for the purpose of managing the performance of the
                  Services, as well as data relating to your use of the
                  Services. Although we perform regular routine backups of data,
                  you are solely responsible for all data that you transmit or
                  that relates to any activity you have undertaken using the
                  Services. You agree that we shall have no liability to you for
                  any loss or corruption of any such data, and you hereby waive
                  any right of action against us arising from any such loss or
                  corruption of such data.
                </span>
              </div>
              <div className="MsoNormal">
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="electronic"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-family: Arial; font-size: 19px;">
                    <h2>
                      23. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND
                      SIGNATURES
                    </h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  Visiting the Services, sending us emails, and completing
                  online forms constitute electronic communications. You consent
                  to receive electronic communications, and you agree that all
                  agreements, notices, disclosures, and other communications we
                  provide to you electronically, via email and on the Services,
                  satisfy any legal requirement that such communication be in
                  writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES,
                  CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC
                  DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS
                  INITIATED OR COMPLETED BY US OR VIA THE SERVICES. You hereby
                  waive any rights or requirements under any statutes,
                  regulations, rules, ordinances, or other laws in any
                  jurisdiction which require an original signature or delivery
                  or retention of non-electronic records, or to payments or the
                  granting of credits by any means other than electronic means.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component">
                  <span data-style="font-size: 15px;"></span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="sms"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 19px; line-height: 1.5;">
                  <strong>
                    <h2>24. SMS TEXT MESSAGING</h2>
                  </strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  <strong className="block-component"></strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_2"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="font-size: 15px;">
                    <h3>Opting Out</h3>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  <strong className="block-component"></strong>
                  <strong className="question">
                    Turn off reminders feature in user's journeys
                  </strong>
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_2"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="font-size: 15px;">
                    <h3 data-style="line-height: 1.5;">
                      Message and Data Rates
                    </h3>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  Please be aware that message and data rates may apply to any
                  SMS messages sent or received. The rates are determined by
                  your carrier and the specifics of your mobile plan.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_2"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="font-size: 15px; line-height: 1.5;">
                    <h3>Support</h3>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  If you have any questions or need assistance regarding our SMS
                  communications, please email us at{" "}
                  <strong className="question">contact@cesarolvr.com</strong>
                  <strong className="block-component"></strong> or call at{" "}
                  <strong className="question">(+55)11955573567</strong>
                  <strong className="statement-end-if-in-editor"></strong>.
                  <br />
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  <strong className="statement-end-if-in-editor"></strong>
                </span>
                <strong className="block-component"></strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="california"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-family: Arial; font-size: 19px;">
                    <h2>25. CALIFORNIA USERS AND RESIDENTS</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  If any complaint with us is not satisfactorily resolved, you
                  can contact the Complaint Assistance Unit of the Division of
                  Consumer Services of the California Department of Consumer
                  Affairs in writing at 1625 North Market Blvd., Suite N 112,
                  Sacramento, California 95834 or by telephone at (800) 952-5210
                  or (916) 445-1254.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="statement-end-if-in-editor"></strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="misc"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 1.5; font-family: Arial; font-size: 19px;">
                    <h2>26. MISCELLANEOUS</h2>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  These Legal Terms and any policies or operating rules posted
                  by us on the Services or in respect to the Services constitute
                  the entire agreement and understanding between you and us. Our
                  failure to exercise or enforce any right or provision of these
                  Legal Terms shall not operate as a waiver of such right or
                  provision. These Legal Terms operate to the fullest extent
                  permissible by law. We may assign any or all of our rights and
                  obligations to others at any time. We shall not be responsible
                  or liable for any loss, damage, delay, or failure to act
                  caused by any cause beyond our reasonable control. If any
                  provision or part of a provision of these Legal Terms is
                  determined to be unlawful, void, or unenforceable, that
                  provision or part of the provision is deemed severable from
                  these Legal Terms and does not affect the validity and
                  enforceability of any remaining provisions. There is no joint
                  venture, partnership, employment or agency relationship
                  created between you and us as a result of these Legal Terms or
                  use of the Services. You agree that these Legal Terms will not
                  be construed against us by virtue of having drafted them. You
                  hereby waive any and all{" "}
                  <strong className="block-component"></strong>defenses
                  <strong className="statement-end-if-in-editor"></strong> you
                  may have based on the electronic form of these Legal Terms and
                  the lack of signing by the parties hereto to execute these
                  Legal Terms.
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component">
                  <span data-style="font-size: 15px;"></span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="heading_1"
                id="contact"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span data-style="line-height: 115%; font-family: Arial;">
                    <span data-style="font-size: 19px; line-height: 1.5;">
                      <h2>27. CONTACT US</h2>
                    </span>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span
                  data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                >
                  In order to resolve a complaint regarding the Services or to
                  receive further information regarding use of the Services,
                  please contact us at:
                </span>
              </div>
              <div
                className="MsoNormal"
                data-style="line-height: 1.5; text-align: left;"
              >
                <br />
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  <span data-style="color: rgb(89, 89, 89);">
                    <strong className="question">
                      <strong>Journeylog</strong>
                    </strong>
                    <strong>
                      <strong className="block-component"></strong>
                    </strong>
                  </span>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  <span data-style="line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);">
                    <strong className="question">
                      <strong>
                        <strong className="question">
                          R. Tapari - Vila Esperança, São Paulo - SP, 03651-060,
                          Brazil
                        </strong>
                      </strong>
                    </strong>
                    <span data-style="line-height: 115%; font-family: Arial; color: rgb(89, 89, 89);">
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                    <strong className="block-component"></strong>
                  </span>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span data-style="font-size: 15px;">
                  <strong>
                    <span data-style="color: rgb(89, 89, 89);">
                      <strong className="question">
                        <strong className="block-component"></strong>
                        <strong className="question">03651060</strong>
                        <strong className="statement-end-if-in-editor"></strong>
                      </strong>
                      <strong className="block-component"></strong>,
                      <strong className="question">São Paulo</strong>
                      <strong className="statement-end-if-in-editor"></strong>
                      <strong className="block-component"></strong>{" "}
                      <strong className="question">03651-060</strong>
                      <strong className="statement-end-if-in-editor"></strong>
                    </span>
                  </strong>
                  <strong>
                    <span data-style="color: rgb(89, 89, 89);">
                      <strong className="block-component"></strong>
                    </span>
                    <strong className="block-component"></strong>
                  </strong>
                </span>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong className="block-component">
                  <strong></strong>
                </strong>
                <strong>
                  <strong className="question">Brazil</strong>
                </strong>
                <strong className="statement-end-if-in-editor"></strong>
                <strong className="statement-end-if-in-editor"></strong>
                <strong className="statement-end-if-in-editor">
                  <strong></strong>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span
                    data-style="font-size:11.0pt;line-height:115%;font-family:Arial;
Calibri;color:#595959;mso-themecolor:text1;mso-themetint:166;"
                  >
                    <strong>
                      <strong className="block-component"></strong>Phone:{" "}
                      <strong className="question">(+55)11955573567</strong>
                      <strong className="statement-end-if-in-editor"></strong>
                    </strong>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <strong>
                  <span>
                    <strong>
                      <strong className="block-component"></strong>
                    </strong>
                  </span>
                </strong>
              </div>
              <div
                className="MsoNormal"
                data-custom-className="body_text"
                data-style="line-height: 1.5; text-align: left;"
              >
                <span>
                  <strong>contact@cesarolvr.com</strong>
                </span>
              </div>
            </div>
          </div>

          <br />
          <br />
          <br />
          <Footer />
          <br />
        </div>
      </div>
    </div>
  );
};

export default Purpose;
