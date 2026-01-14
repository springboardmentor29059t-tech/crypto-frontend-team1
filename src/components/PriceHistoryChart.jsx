import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "./Card";

export default function PriceHistoryChart({ data, asset }) {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-4">
        {asset} Price Trend
      </h2>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="capturedAt"
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString()
              }
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="priceInr"
              stroke="#a855f7"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
