import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const TWILIO_ACCOUNT_SID = Deno.env.get('TWILIO_ACCOUNT_SID');
const TWILIO_AUTH_TOKEN = Deno.env.get('TWILIO_AUTH_TOKEN');
const TWILIO_PHONE_NUMBER = Deno.env.get('TWILIO_PHONE_NUMBER');
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { datetime } from "https://deno.land/x/ptera/mod.ts";
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { getEmailReminder } from './emails/reminder.ts';
Deno.serve(async (req)=>{
  const data = await req.json();
  try {
    const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
      global: {
        headers: {
          Authorization: req.headers.get('Authorization')
        }
      }
    });
    for(const index in data){
      const element = data[index];
      const isDaily = element.when === 'daily';
      const isWeekly = element.when === 'weekly';
      const isMonthly = element.when === 'monthly';
      const subjectSufix = isDaily ? 'today' : isWeekly ? 'this week' : 'this month';
      console.log(`user_id -> `, JSON.stringify(element));
      if (element.where === 'email') {
        try {
          const res = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${RESEND_API_KEY}`
            },
            body: JSON.stringify({
              from: 'Journeylog <cesarolvr@journeylog.app>',
              to: element.email,
              subject: `🚀 You have an habit to reinforce ${subjectSufix}: ${element?.journey_name}`,
              html: getEmailReminder({
                name: element?.user_name,
                journey_name: element?.journey_name,
                frequency: element?.when
              })
            })
          });
          const resendRes = await res.json();
          console.log(`resendRes -> `, JSON.stringify(resendRes));
          if (resendRes?.id) {
            const nextSendToSum = isDaily ? {
              day: 1
            } : isWeekly ? {
              day: 7
            } : {
              month: 1
            };
            const jsDateRaw = new Date(element?.next_sent);
            const jsDate = new Date(jsDateRaw.setUTCHours(jsDateRaw.getUTCHours(), 0, 0, 0));
            const newNextSent = datetime(jsDate.toISOString()).add(nextSendToSum).toUTC().toISO();
            const newLastSent = datetime().toUTC().toISO();
            console.log(`next_sent -> `, JSON.stringify({
              newNextSent,
              hour: jsDateRaw.getUTCHours()
            }));
            const res = await supabase.from("notification").update({
              last_sent: newLastSent,
              next_sent: newNextSent,
              user_id: element?.user_id
            }).eq("id", element?.id);
            if (res?.error) {
              console.log(`error on update reminder ${JSON.stringify(res)}`);
              return new Response(`error on update reminder ${res?.error}`, {
                status: 500,
                headers: {
                  "Content-Type": "application/json"
                }
              });
            }
            console.log(`success on update reminders -> ${JSON.stringify(res)}`);
          }
          return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
              'Content-Type': 'application/json'
            }
          });
        } catch (err) {
          console.log(`resend err -> ${err}`);
          return new Response(JSON.stringify(data), {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      } else if ((element.where === 'whatsapp' || element.where === 'sms') && !!element?.phone) {
        const encodedCredentials = base64.fromUint8Array(new TextEncoder().encode(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`));
        if (!(TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN)) return;
        try {
          const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
              Authorization: `Basic ${encodedCredentials}`
            },
            body: new URLSearchParams({
              Body: element.where === 'whatsapp' ? '' : `🚀 You have an habit to reinforce ${subjectSufix}: ${element?.journey_name}`,
              From: element.where === 'whatsapp' ? `whatsapp:${TWILIO_PHONE_NUMBER}` : `${TWILIO_PHONE_NUMBER}`,
              To: element.where === 'whatsapp' ? `whatsapp:${element?.phone}` : `${element?.phone}`,
              ContentSid: element.where === 'whatsapp' ? 'HX0f0f9da60f41d7b3a9bb11b989b57511' : ``,
              MessagingServiceSid: "MGcd4b6eddae8c51f90d7cece0eab43204",
              PersistentAction: JSON.stringify([
                `template:${JSON.stringify({
                  name: "default_reminder",
                  language: {
                    code: "en"
                  },
                  components: [
                    {
                      type: "body",
                      parameters: [
                        {
                          type: "text",
                          text: element?.journey_name
                        }
                      ]
                    }
                  ]
                })}`
              ])
            }).toString()
          });
          const data = await res.json();
          console.log('data', JSON.stringify(data));
          if (data?.account_sid) {
            const nextSendToSum = isDaily ? {
              day: 1
            } : isWeekly ? {
              day: 7
            } : {
              month: 1
            };
            const jsDateRaw = new Date(element?.next_sent);
            const jsDate = new Date(jsDateRaw.setUTCHours(jsDateRaw.getUTCHours(), 0, 0, 0));
            const newNextSent = datetime(jsDate.toISOString()).add(nextSendToSum).toUTC().toISO();
            const newLastSent = datetime().toUTC().toISO();
            console.log(`next_sent -> `, JSON.stringify({
              newNextSent
            }));
            const res = await supabase.from("notification").update({
              last_sent: newLastSent,
              next_sent: newNextSent,
              user_id: element?.user_id
            }).eq("id", element?.id);
            if (res?.error) {
              console.log(`error on update reminder ${JSON.stringify(res)}`);
              return new Response(`error on update reminder ${res?.error}`, {
                status: 500,
                headers: {
                  "Content-Type": "application/json"
                }
              });
            }
            console.log(`success on update reminders -> ${JSON.stringify(res)}`);
          }
          return data;
        } catch (err) {
          console.log(`twilio err -> ${err}`);
          return new Response(JSON.stringify(data), {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      } else {
        return new Response('Whatsapp or SMS not activated', {
          headers: {
            'Content-Type': 'application/json'
          },
          status: 404
        });
      }
    }
  } catch (err) {
    console.log(`supabase err -> ${err}`);
    return new Response(String(err?.message ?? err), {
      status: 500
    });
  }
});
