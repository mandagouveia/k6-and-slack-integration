import http from 'k6/http';

export const options = {
    stages:[
        { duration: '2s', target: 2 },
        { duration: '2s', target: 2 },
        { duration: '3s', target: 2 },
    ],    
};

export default function (){
    http.get('https://k6.io/docs/');
}

export const payload = {
	channel: "random",
	attachments: [
		{
			color : "#632eb8",
			blocks : [
				{
					type : "section",
					text : {
						type : "mrkdwn",
						text : "*K6 Report Summary*"
					}
				},
				{
					type : "section",
					text : {
						type : "mrkdwn",
						text : "",
					},
					accessory : {
						type : "image",
						image_url : "https://k6.io/images/landscape-icon.png",
						alt_text : "K6 thumbnail"
						}
					}
				]
			}
		],
	};

export function sendSlackMessage(data){
    let avgResponseTime = data.metrics.http_req_duration.values['avg'];
    let p95ResponseTime = data.metrics.http_req_duration.values['p(95)'];
    let vus = data.metrics.vus.values['value'];
    let fail = data.metrics.http_req_failed.values['value'];
    let maxThroughput = data.metrics.http_reqs.values['count'];
    
    let sectionBlocks = payload.attachments.find((attachments) => {
        return attachments.blocks[1].type === "section";
        
    });
    
    sectionBlocks.blocks[1].text.text = "*Total of transactions:*\n" + maxThroughput.toFixed(2) + " reqs" +
        "\n*Failed Requests:*\n" + fail + " %" +
        "\n*Average Response Time:*\n" + avgResponseTime.toFixed(2) + " ms" +
        "\n*95 Percentile:*\n" + p95ResponseTime.toFixed(2) + " ms" +
        "\n*Total of VUs:*\n" + vus + " VUs";
    
    const slackRes = http.post(' WEBHOOK URL SHOULD BE ADDED HERE ', JSON.stringify(payload),{
    headers: {
        'Authorization': 'Bearer' + 'SLACK API TOKEN SHOULD BE ADDED HERE',
        'Content-Type':'application/json',
    }
    });  
}
    export function handleSummary(data){
    sendSlackMessage(data);
    return{
        'stdout': textSummary(data, {indent: '', enableColors: true}),

    }
}



