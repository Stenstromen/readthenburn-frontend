import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { useDefaultProvider } from "../contexts/default";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Stats({ isMobile, stats }) {
  const { darkmode } = useDefaultProvider();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: darkmode
              ? "rgba(255, 255, 255, 0.95)"
              : "rgba(0, 0, 0, 0.8)",
            color: darkmode ? "#000" : "#fff",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <p
            style={{ margin: 0, fontSize: "12px", fontWeight: "bold" }}
          >{`Date: ${label}`}</p>
          <p style={{ margin: 0, fontSize: "12px", color: "#ff6b6b" }}>
            {`Messages: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
    label: PropTypes.string,
  };

  return (
    <div style={{ marginTop: "40px", padding: "20px 0" }}>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <h2
          style={{
            color: darkmode ? "#000" : "#fff",
            fontSize: isMobile ? "28px" : "36px",
            fontWeight: "600",
            marginBottom: "10px",
          }}
        >
          📊 Statistics
        </h2>
        <p
          style={{
            color: darkmode ? "#666" : "#ccc",
            fontSize: "16px",
            margin: 0,
          }}
        >
          Total messages burned over time
        </p>
      </div>

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <Card
          style={{
            background: darkmode
              ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              : "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
            border: "none",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            maxWidth: "300px",
            margin: "0 auto",
          }}
        >
          <Card.Body style={{ padding: "10px" }}>
            <div
              style={{
                color: "#fff",
                fontSize: isMobile ? "16px" : "18px",
                fontWeight: "500",
                marginBottom: "10px",
              }}
            >
              Total Messages Burned
            </div>
            <div
              style={{
                color: "#fff",
                fontSize: isMobile ? "48px" : "56px",
                fontWeight: "700",
                lineHeight: "1",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              }}
            >
              {stats.totalMessages.toLocaleString()}
            </div>
            <div
              style={{
                color: "rgba(255, 255, 255, 0.8)",
                fontSize: "14px",
                marginTop: "5px",
              }}
            >
              🔥 Messages destroyed forever
            </div>
          </Card.Body>
        </Card>
      </div>

      <Card
        style={{
          backgroundColor: darkmode
            ? "rgba(255, 255, 255, 0.95)"
            : "rgba(0, 0, 0, 0.8)",
          border: "none",
          borderRadius: "15px",
          padding: "20px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Card.Body style={{ padding: "10px" }}>
          <h4
            style={{
              color: darkmode ? "#000" : "#fff",
              fontSize: isMobile ? "18px" : "20px",
              fontWeight: "600",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            📈 Message Activity Over Time
          </h4>

          <ResponsiveContainer width="100%" height={isMobile ? 280 : 350}>
            <AreaChart
              data={stats.history}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff6b6b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#ff6b6b" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={darkmode ? "#e0e0e0" : "#444"}
                strokeOpacity={0.3}
              />
              <XAxis
                dataKey="date"
                tick={{
                  fill: darkmode ? "#666" : "#ccc",
                  fontSize: isMobile ? 10 : 12,
                }}
                axisLine={{ stroke: darkmode ? "#ccc" : "#666" }}
                tickLine={{ stroke: darkmode ? "#ccc" : "#666" }}
              />
              <YAxis
                tick={{
                  fill: darkmode ? "#666" : "#ccc",
                  fontSize: isMobile ? 10 : 12,
                }}
                axisLine={{ stroke: darkmode ? "#ccc" : "#666" }}
                tickLine={{ stroke: darkmode ? "#ccc" : "#666" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="totalMessages"
                stroke="#ff6b6b"
                strokeWidth={3}
                fill="url(#colorGradient)"
                dot={{
                  fill: "#ff6b6b",
                  strokeWidth: 2,
                  stroke: "#fff",
                  r: 4,
                }}
                activeDot={{
                  r: 6,
                  stroke: "#ff6b6b",
                  strokeWidth: 2,
                  fill: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </div>
  );
}

Stats.propTypes = {
  isMobile: PropTypes.bool.isRequired,
  stats: PropTypes.shape({
    totalMessages: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        totalMessages: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default Stats;
