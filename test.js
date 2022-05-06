$.post(
  'https://usersapi.communicate.engageone.co/authenticate',
  {
    firstName,
    lastName,
    email,
    company,
    repEmail,
    repFirstName,
    repName,
    campaignId,
    acctRegion,
    webinar,
    action
  },
  function (data) {
    console.log(JSON.stringify(data, null, 2));
  }
);

$.ajax({
  url: 'https://usersapi.communicate.engageone.co/authenticate',
  type: 'post',
  headers: {
    'PB-Customer-Id': '<your PB-Customer-Id>'
  },
  data: {
    client_id: '<your client id>',
    secret: '<your secret>',
    customer_id: '<your PB-Customer-Id>'
  },
  dataType: 'json'
}).done(function (eocmToken) {
  $.ajax({
    url: 'https://api.us-east-1.communicate.engageone.co/campaigns/<eoc template name>/transactional',
    type: 'post',
    headers: {
      'Content-Type': 'application/json',
      'PB-Customer-Id': '<your PB-Customer-Id>',
      Accept: 'application/json',
      Authorization: `Bearer ${eocmToken}`
    },
    data: {
      communication: 'utilitiesPaymentPlan',
      dataset: [
        {
          name: '<name value>',
          email: '<email value>',
          arrears: '<arrears value>',
          amount: '<amount value>',
          monthsInclInterest: '<monthsInclInterest value>',
          monthsExclInterest: '<monthsExclInterest value>',
          pixelUrl: '<pixel url value>'
        }
      ],
      email_json_path: '$[*].email',
      sender: '<your configured EOC sender address>',
      subject: '<Your subject line>',
      ignore_missing_fields: true,
      project: '<your eoc project name>',
      sender_name: '<sender name you like to appear in from address>',
      reply_to: '<your preferred reply to address>'
    },
    dataType: 'json'
  });
});
