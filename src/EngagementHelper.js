import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const EngagementHelper = {
  engagementMessageOverTimeChartOptions: (messageCountList, channels) => {
    const channelsWithMultipleDates = channels.filter((channel) => {
      const channelId = channel.value;
      return (
        messageCountList.filter((message) => message.channelId === channelId)
          .length > 1
      );
    });

    const dataByChannel = channelsWithMultipleDates.map((channel) => {
      const channelId = channel.value;
      const channelMessages = messageCountList.filter(
        (message) => message.channelId === channelId
      );
      const data = channelMessages.map((message) => ({
        x: new Date(message.timeBucket).getTime(),
        y: parseInt(message.count),
      }));
      return {
        name: channel.name,
        data,
      };
    });

    const options = {
      title: {
        text: "Engagement Messages Over Time",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
      },
      yAxis: {
        title: {
          text: "Message Count",
        },
      },
      tooltip: {
        formatter: function() {
          return `<b>${this.series.name}</b><br/>Date: ${Highcharts.dateFormat(
            "%Y-%m-%d",
            this.x
          )}<br/>Messages: ${this.y}`;
        },
      },
      series: dataByChannel,
    };

    return options;
  },
};

export default EngagementHelper;
