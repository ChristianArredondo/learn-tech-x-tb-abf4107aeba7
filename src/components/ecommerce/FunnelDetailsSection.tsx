import { Row, Col, Card, Statistic, Empty } from 'antd';
import { blue } from '@ant-design/colors'
import useFetchOnce from '@/utils/client/useFetchOnce';

const ENDPOINT_URL = '/api/ecommerce/funnel-details';

const gridStyle: React.CSSProperties = {
    width: '25%',
    textAlign: 'start',
};

function CalculatePercentage(a: number, b: number): string {
    return ((a / b) * 100).toFixed(2) + '%';
}

export default function FunnelDetailsSection(): React.ReactNode {
    const { isLoading, data } = useFetchOnce<{
        num_sessions: number;
        num_product_views: number;
        num_checkouts: number;
        num_purchases: number;
    }>(ENDPOINT_URL);

    const numSessions = data?.num_sessions ?? 0;
    const numProductViews = data?.num_product_views ?? 0;
    const percenProductViews = CalculatePercentage(numProductViews, numSessions);

    const numCheckouts = data?.num_checkouts ?? 0;
    const percenCheckouts = CalculatePercentage(numCheckouts, numProductViews);

    const numPurchases = data?.num_purchases ?? 0;
    const percenPurchases = CalculatePercentage(numPurchases, numCheckouts);

    const percenNet = CalculatePercentage(numPurchases, numSessions);

    let content = null;
    let image = null;
    if (isLoading) {
        content = (
            <Card>
                <Empty description='loading' />
            </Card>
        )
    } else if (data != null) {
        content = (
            <Card>
                <Card.Grid style={gridStyle}>
                    <Statistic
                        precision={0}
                        title='Sessions'
                        value={numSessions}
                        valueStyle={{ fontSize: 14, color: "#003a8c" }}
                    />
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    <Statistic
                        title='Product Views'
                        value={numProductViews}
                        precision={0}
                        valueStyle={{ fontSize: 14, color: "#003a8c" }}
                    />
                    <span style={{ fontSize: 14, color: "#003a8c" }}>({percenProductViews})</span>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    <Statistic
                        title='Checkouts'
                        value={numCheckouts}
                        precision={2}
                        prefix='$'
                        valueStyle={{ fontSize: 14, color: "#003a8c" }}
                    />
                    <span style={{ fontSize: 14, color: "#003a8c" }}>({percenCheckouts})</span>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    <Statistic
                        title='Purchases'
                        value={numPurchases}
                        precision={2}
                        prefix='$'
                        valueStyle={{ fontSize: 14, color: "#003a8c" }}
                    />
                    <span style={{ fontSize: 14, color: "#003a8c" }}>({percenPurchases})</span>
                </Card.Grid>
            </Card>
        )
        image = (
            <Card>
                <Card.Grid style={gridStyle}>
                    <div style={
                        {
                            borderTop: "50px solid #003a8c",
                            borderBottom: "50px solid #003a8c",
                            borderLeft: "50px solid #003a8c",
                            borderRight: "50px solid #003a8c",
                            backgroundColor: "#003a8c",
                            height: 0,
                            width: "100%"
                        }
                    }></div>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    <div style={
                        {
                            borderTop: "50px solid transparent",
                            borderBottom: "50px solid transparent",
                            borderLeft: "100px solid #0958d9",
                            height: 0,
                            width: "100%"
                        }
                    }></div>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                    <div style={
                        {
                            borderTop: "50px solid transparent",
                            borderBottom: "50px solid transparent",
                            borderLeft: "100px solid #4096ff",
                            height: 0,
                            width: "100%"
                        }
                    }></div>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                <div style={
                        {
                            borderTop: "50px solid transparent",
                            borderBottom: "50px solid transparent",
                            borderLeft: "100px solid #91caff",
                            height: 0,
                            width: "100%"
                        }
                    }></div>

                    <span style={{ fontSize: 14 }}>Net: {percenNet}</span>
                </Card.Grid>
            </Card>
        )
    } else {
        content = <Card>
            <Empty description='Missing implementation' />
        </Card>
    }

    return (
        <section style={{ marginBottom: 48, padding: 16 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Funnel Details</h2>
            {content}
            {image}
        </section>
    );
}
